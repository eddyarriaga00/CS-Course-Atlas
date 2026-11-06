'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '127.0.0.1';

const CONTENT_TYPES = Object.freeze({
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.webp': 'image/webp',
    '.xml': 'application/xml; charset=utf-8'
});

function resolveRequestPath(urlPathname = '/') {
    let pathname = urlPathname;
    try {
        pathname = decodeURIComponent(pathname);
    } catch (_error) {
        return null;
    }

    if (pathname === '/') {
        pathname = '/index.html';
    } else if (pathname.endsWith('/')) {
        pathname = `${pathname}index.html`;
    }

    const relativePath = pathname.startsWith('/') ? `.${pathname}` : pathname;
    const resolvedPath = path.resolve(ROOT_DIR, relativePath);
    if (!resolvedPath.startsWith(ROOT_DIR)) {
        return null;
    }
    return resolvedPath;
}

function getContentType(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    return CONTENT_TYPES[extension] || 'application/octet-stream';
}

const server = http.createServer((request, response) => {
    const url = new URL(request.url || '/', `http://${request.headers.host || `${HOST}:${PORT}`}`);
    const resolvedPath = resolveRequestPath(url.pathname);

    if (!resolvedPath) {
        response.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
        response.end('Bad request');
        return;
    }

    fs.stat(resolvedPath, (statError, stats) => {
        if (statError || !stats.isFile()) {
            response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
            response.end('Not found');
            return;
        }

        response.writeHead(200, {
            'content-type': getContentType(resolvedPath),
            'cache-control': 'no-cache'
        });
        fs.createReadStream(resolvedPath).pipe(response);
    });
});

server.listen(PORT, HOST, () => {
    process.stdout.write(`Static server ready at http://${HOST}:${PORT}\n`);
});

