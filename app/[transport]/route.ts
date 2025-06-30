import { createMcpHandler } from "@vercel/mcp-adapter";
import { getRedisUrl, isRedisAvailable } from "../../lib/redis";
import { reactCodeReviewTool } from "../../tools";

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      reactCodeReviewTool.name,
      reactCodeReviewTool.description,
      reactCodeReviewTool.schema,
      reactCodeReviewTool.handler
    );
  },
  {},
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
    ...(isRedisAvailable() && { redisUrl: getRedisUrl() }),
  }
);

export { handler as GET, handler as POST, handler as DELETE };
