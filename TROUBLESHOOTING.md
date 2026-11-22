# MCP connection checks

Start with `npm ci --ignore-scripts` and `npm test` on Node 22+. This test needs no key or capture. It verifies initialize, tools/list and the capabilities tool against the npm executable, not a mocked server.

| Symptom | Check |
| --- | --- |
| CLI help appears or the process exits before initialize | Include the `mcp` subcommand. The same package also serves a normal command-line interface. |
| Input-root error | Supply an existing ordinary directory after `--input-root`. Do not omit its value or leave a placeholder. |
| Directory reports “never answered handshake” | Compare its actual launch command with the official registry's runtime/package arguments and required input-root variable. Bare `npx twinbly` is not a valid MCP launch. |
| Account operation rejects a missing key | Expected: only discovery and capabilities are available without credentials. Add your key through private host settings when needed. |
| Paid start unavailable in a host | Check its form-elicitation support. Use the CLI's explicit review/approval flow if unsupported; do not bypass confirmation. |
| Processing completed but a requested conversion is missing | Inspect available downloads and conversion state; do not assume every format is ready at training completion. |

A green local smoke check does not invalidate every directory failure. Preserve the scanner's exact command, runtime, package version and sanitized error before diagnosing it. Do not weaken input-folder restrictions merely to accommodate a scanner.

For a reproducible issue, provide Node/OS and Twinbly versions, your host, the command with private paths replaced, the failing step, and sanitized stderr. Never post keys, workflow state, private media, account details or signed result URLs.
