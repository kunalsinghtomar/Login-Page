const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;

// Content types allow the small static server to serve the Login Tester homepage and browser assets.
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Static homepage server: the public route is available without authentication for visitors and reviewers.
const server = http.createServer((req, res) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

    // Default route: serve the public homepage before any sign-in interaction.
    let filePath = req.url === '/' || req.url === '' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('\n=========================================');
    console.log('             LOGIN TESTER                ');
    console.log('=========================================');
    console.log(` Server running at: http://localhost:${PORT}`);
    console.log(' To test real Google Sign-In, ensure:');
    console.log(' 1. You register a Google Cloud App.');
    console.log(` 2. Set Authorized Origin to: http://localhost:${PORT}`);
    console.log(' 3. Set your Client ID using the page configuration.');
    console.log('-----------------------------------------');
    console.log(' Feel free to click "Simulate Login" instantly');
    console.log(' to preview without any configuration!');
    console.log('=========================================\n');
});
