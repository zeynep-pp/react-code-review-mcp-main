export const runtime = 'edge';

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(`data: hello from SSE endpoint\n\n`);
      controller.enqueue(`data: ${JSON.stringify({ message: "SSE working", timestamp: Date.now() })}\n\n`);
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