// No key, upload, account request or paid processing. Temporary empty capture root.
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const root = await mkdtemp(path.join(tmpdir(), 'twinbly-smoke-'));
const captures = path.join(root, 'captures');
await mkdir(captures);
const binary = fileURLToPath(new URL('../node_modules/twinbly/bin/twinbly.cjs', import.meta.url));
const payload = fileURLToPath(new URL('../node_modules/twinbly/twinbly.cjs', import.meta.url));
assert.equal(createHash('sha256').update(await readFile(payload)).digest('hex'),
  'aaa388159e867e5abbd8789bf8853500531225ca9b177137dfd5c4849974ed79');
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [binary, 'mcp', '--input-root', captures, '--state-dir', path.join(root, 'state')],
  cwd: root,
  env: {PATH: process.env.PATH || '', TWINBLY_API_KEY: '', NODE_ENV: 'test'},
  stderr: 'pipe',
});
let stderr = '';
transport.stderr?.on('data', chunk => { stderr += String(chunk); });
const client = new Client({name: 'twinbly-public-smoke', version: '1.0.0'});
const deadline = setTimeout(() => { console.error('MCP check timed out'); void client.close(); process.exitCode = 1; }, 20000);
try {
  await client.connect(transport);
  const tools = (await client.listTools()).tools.map(tool => tool.name).sort();
  assert.equal(tools.length, 11);
  assert(tools.includes('twinbly_capabilities'));
  const response = await client.callTool({name: 'twinbly_capabilities', arguments: {}});
  assert(!response.isError);
  const result = JSON.parse(response.content.find(item => item.type === 'text').text);
  assert.equal(result.data.version, '0.1.1');
  assert.equal(stderr, '');
  console.log(JSON.stringify({package:'twinbly@0.1.1', initialize:'pass', toolsList:'pass', capabilities:'pass', tools, credentialsUsed:false, paidProcessing:false}, null, 2));
} finally {
  clearTimeout(deadline);
  await client.close();
  await rm(root, {recursive: true, force: true});
}
