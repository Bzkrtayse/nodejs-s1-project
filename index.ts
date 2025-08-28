import http, { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { promises as fs, read } from "fs";
const PORT = 3000;
const HOSTNAME = "localhost";

const directoryPath = path.join(__dirname, 'src', 'pages');
const stylesPath = path.join(__dirname, "src", "styles");


async function readHTMLfile(res: ServerResponse, fileName: string) {
  const filePath = path.join(directoryPath, fileName);
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  }
  catch (error) {
    res.writeHead(500,{'content-type':'text/plain'});
    res.end("500 Internal Server Error");
  }
}
async function serveCSS(res: ServerResponse, fileUrl: string) {
  const filePath = path.join(stylesPath, path.basename(fileUrl));
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 CSS File Not Found");
  }
}

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  
  const url = req.url || "/";

  if (url.startsWith("/styles/")) {
    serveCSS(res, url);
    return;
  }
 
  if (req.url === "/" || req.url === "/home") {
    readHTMLfile(res, 'index.html');
  }
  else if (req.url === "/products") {
    readHTMLfile(res, 'products.html');
  }
  else if (req.url === "/connect") {
    readHTMLfile(res, 'contact.html');
  }
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening on http://${HOSTNAME}:${PORT}...`);
});
