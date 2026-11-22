# Twinbly: Gaussian splatting API, CLI and local MCP examples

Turn overlapping photos or video into 3D Gaussian splats with Twinbly cloud processing. Build your own branded web or native experience around the available assets: your application controls its UI, customer access and billing.

This examples repository exercises the published client. It does not contain Twinbly's processing implementation or a local training engine.

## Try the MCP connection without an account or payment

Requires Node.js 22 or newer. From this directory:

```sh
npm ci --ignore-scripts
npm test
```

The check verifies the pinned `twinbly@0.1.1` executable checksum, initializes the local MCP connection, lists all 11 tools and reads capabilities. It uses an empty temporary capture folder and passes no API key. It does not upload, create a job or start processing. A successful check proves this SDK-to-server connection; it does not establish support for every tool in every assistant host.

The corresponding CLI checks are:

```sh
npx --no-install twinbly version
npx --no-install twinbly capabilities
```

## Connect your coding assistant

Follow the [official setup guide](https://www.twinbly.com/developers/cli-mcp). The server uses local stdio, so the host must launch the executable with `mcp` and a real absolute input folder:

```json
{
  "mcpServers": {
    "twinbly": {
      "command": "/absolute/path/to/node",
      "args": [
        "/absolute/path/to/twinbly-examples/node_modules/twinbly/bin/twinbly.cjs",
        "mcp", "--input-root", "/absolute/path/to/captures",
        "--state-dir", "/absolute/private/twinbly-state"
      ]
    }
  }
}
```

Replace every absolute path and create the captures directory first. Each host may use a different configuration wrapper. List tools and read `twinbly_capabilities` before adding an API key.

A bare `npx twinbly@0.1.1` prints CLI help; it does not start an MCP transport. A directory scanner must preserve the `mcp` argument and supply the required `input_root` variable from the official registry entry. A missing key does not prevent discovery. See [troubleshooting](TROUBLESHOOTING.md).

## Build something useful

- [Phone video to 3D API walkthrough](https://www.twinbly.com/developers/phone-video-to-3d): capture selection, estimates, upload, processing and available downloads.
- [Legend Guide case study](https://www.twinbly.com/developers/legend-guide): a real independent product built around Twinbly processing and spatial content.
- [Complete API guide](https://www.twinbly.com/developers) and [live OpenAPI schema](https://rg-splats.web.app/v1/openapi.json): exact contracts and access restrictions. Link to the live schema rather than silently maintaining a stale copy here.
- [Coding-agent brief](https://www.twinbly.com/developers/agent-brief.md).
- [Capture guidance](https://www.twinbly.com/learn/capture-for-3d): coverage, overlap and viewpoints.

## Make the promise precise

Account and processing operations require a Twinbly processing key. Keep it in a private environment file or your host's secret settings, never a prompt, Git commit or issue. Paid starts require explicit approval and wallet funds; the minimum wallet top-up is $5 USD, separate from a job's processing cost. Estimates are not hard spending caps. MCP paid starts require the host's confirmation-form support; otherwise use CLI review and approval.

The public 0.1.1 release is a local MCP server, not a hosted connector for browser-only chats. Processing completion and converted-format readiness differ; inspect the actual available downloads. The tools do not automatically publish a hosted scene or reproduce the full Twinbly editor. The consumer chat/guest-payment journey is not announced as generally available here.

[Official npm package](https://www.npmjs.com/package/twinbly) · [Official MCP Registry](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.Rock-Garden-Inc%2Ftwinbly/versions/0.1.1) · [Pricing](https://www.twinbly.com/pricing) · [Service terms](https://www.twinbly.com/terms)
