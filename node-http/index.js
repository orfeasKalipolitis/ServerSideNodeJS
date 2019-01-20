const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    res.setHeader('Content-Tyep', 'text/html');
    if (req.method === 'GET') {
        var fileUrl;
        if (req.url === '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.end('<html><body><h1>Error 404! File not found!</h1></body></html>');
                    return;
                }

                res.statusCode = 200;
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.end('<html><body><h1>Error 404! File not HTML!</h1></body></html>');
        }
    } else {
        res.statusCode = 404;
        res.end(`<html><body><h1>Error 404! Method: ${req.method} not supported yet!</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});