const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

const server = http.createServer((req, res) => {
    // Determine the file path
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';

    // Default file if no extension is found
    if (extname === '') filePath += '.html';

    // Check if the file exists
    fs.exists(filePath, exist => {
        if (!exist) {
            // If the file is not found, return 404
            fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                if (err) throw err;
                res.writeHead(404, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            });
            return;
        }

        // Serve the file
        fs.readFile(filePath, (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        });
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});