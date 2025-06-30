import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const origin = process.argv[2] || "https://mcp-for-next-js.vercel.app";

async function main() {
  const transport = new SSEClientTransport(new URL(`${origin}/sse`));

  const client = new Client(
    {
      name: "react-code-review-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        prompts: {},
        resources: {},
        tools: {},
      },
    }
  );

  console.log("Connecting to", origin);
  await client.connect(transport);

  console.log("Connected", client.getServerCapabilities());

  const result = await client.listTools();
  console.log(result);
  client.close();
}

main();
