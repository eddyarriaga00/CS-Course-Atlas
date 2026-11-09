/* CS Course Atlas service worker: lets the site open and keep working offline.
 *
 * - Pages: network first, falling back to the cached app shell (index.html).
 * - The course index (data/atlas-data.json): network first, so new content shows at once.
 * - Versioned files (?v=… or a content hash) and CDN libraries (Pyodide, sql.js, highlight.js):
 *   cache first, since a given URL never changes. When a file gets a new version, older
 *   copies of the same path are dropped so the cache does not grow forever.
 * - The account API (/api/) is never cached.
 */
const CACHE = 'atlas-v2';
const SHELL = ['./', 'index.html', 'preview.html', 'runner.html', 'manifest.webmanifest', 'icons/icon-192.png'];
const CDN = ['https://cdn.jsdelivr.net/pyodide/', 'https://cdnjs.cloudflare.com/ajax/libs/', 'https://fonts.googleapis.com/', 'https://fonts.gstatic.com/'];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys()
        .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
        .then(() => self.clients.claim()));
});

async function put(request, response) {
    if (!response || !response.ok || response.type === 'opaque') return;
    const cache = await caches.open(CACHE);
    const url = new URL(request.url);
    if (url.origin === self.location.origin && url.search) {
        // Keep only the newest version of a path like css/atlas.css?v=….
        for (const old of await cache.keys()) {
            const u = new URL(old.url);
            if (u.origin === url.origin && u.pathname === url.pathname && u.search !== url.search) await cache.delete(old);
        }
    }
    await cache.put(request, response);
}

async function networkFirst(request, fallback) {
    try {
        const response = await fetch(request);
        put(request, response.clone());
        return response;
    } catch (error) {
        const cached = await caches.match(request, { ignoreSearch: !!fallback }) || (fallback && await caches.match(fallback));
        if (cached) return cached;
        throw error;
    }
}

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    put(request, response.clone());
    return response;
}

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    if (url.origin === self.location.origin) {
        if (url.pathname.includes('/api/')) return;
        if (request.mode === 'navigate') { event.respondWith(networkFirst(request, 'index.html')); return; }
        if (url.pathname.endsWith('/atlas-data.json')) { event.respondWith(networkFirst(request)); return; }
        if (url.search || url.pathname.includes('/icons/')) { event.respondWith(cacheFirst(request)); return; }
        event.respondWith(networkFirst(request));
        return;
    }
    if (CDN.some((prefix) => request.url.startsWith(prefix))) event.respondWith(cacheFirst(request));
});
