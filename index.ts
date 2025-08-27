import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from TypeScript server");
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening on port 3000...");
});
