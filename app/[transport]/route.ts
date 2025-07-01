import { createMcpHandler } from "@vercel/mcp-adapter";
import { getRedisUrl, isRedisAvailable } from "../../lib/redis";
import { reactCodeReviewTool } from "../../tools";
import { NextRequest } from "next/server";

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

// Validate transport parameter
function validateTransport(request: NextRequest, params: { transport: string }) {
  const validTransports = ['sse', 'http'];
  if (!validTransports.includes(params.transport)) {
    return new Response('Invalid transport type', { status: 400 });
  }
  return null;
}

export async function GET(request: NextRequest, context: { params: { transport: string } }) {
  const validation = validateTransport(request, context.params);
  if (validation) return validation;
  return handler(request);
}

export async function POST(request: NextRequest, context: { params: { transport: string } }) {
  const validation = validateTransport(request, context.params);
  if (validation) return validation;
  return handler(request);
}

export async function DELETE(request: NextRequest, context: { params: { transport: string } }) {
  const validation = validateTransport(request, context.params);
  if (validation) return validation;
  return handler(request);
}
