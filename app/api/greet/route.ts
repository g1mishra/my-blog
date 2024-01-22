export function GET() {
  return new Response("<h1>Hello, Next.js!<h1>", {
    headers: { "content-type": "text/html" },
  });
}
