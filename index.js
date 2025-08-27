const http = require('http');

const server = http.createServer((req, res) => {
     res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from the other siiiiiiiiiidee');
});

server.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});