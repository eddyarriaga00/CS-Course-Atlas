/* Minimal service worker: keeps registration healthy without caching side effects. */
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
    // No-op passthrough; network handling remains default.
});
