import { reactCodeReviewTool } from "../../../tools";

export const runtime = 'edge';

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      // MCP SSE initialization
      const initMessage = {
        jsonrpc: "2.0",
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {
              listChanged: true
            }
          },
          clientInfo: {
            name: "react-code-review-mcp",
            version: "1.0.0"
          }
        }
      };
      
      controller.enqueue(`data: ${JSON.stringify(initMessage)}\n\n`);
      
      // Send tools list
      const toolsListMessage = {
        jsonrpc: "2.0",
        method: "tools/list",
        result: {
          tools: [{
            name: reactCodeReviewTool.name,
            description: reactCodeReviewTool.description,
            inputSchema: reactCodeReviewTool.schema
          }]
        }
      };
      
      controller.enqueue(`data: ${JSON.stringify(toolsListMessage)}\n\n`);
      
      // Keep connection alive
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(`data: ${JSON.stringify({ type: "ping", timestamp: Date.now() })}\n\n`);
        } catch (error) {
          clearInterval(keepAlive);
        }
      }, 30000);
      
      // Clean up on close
      const cleanup = () => {
        clearInterval(keepAlive);
        try {
          controller.close();
        } catch (error) {
          // Ignore errors when closing
        }
      };
      
      // Set up cleanup
      setTimeout(cleanup, 300000); // Close after 5 minutes
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}