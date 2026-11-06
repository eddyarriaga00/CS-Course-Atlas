/*
 * Public runtime config (safe to commit).
 * For GitHub Pages production, route API/auth calls to the Render backend.
 * Local development keeps apiBaseUrl empty so script.js can auto-detect localhost:3000.
 */
(function initRuntimeConfig() {
    const hostname = (typeof window !== 'undefined' && window.location && window.location.hostname)
        ? String(window.location.hostname).toLowerCase()
        : '';
    const publicFrontendHosts = new Set([
        'eddyarriaga00.github.io',
        'cscourseatlas.com',
        'www.cscourseatlas.com'
    ]);
    const isPublicFrontendHost = publicFrontendHosts.has(hostname);

    window.__APP_CONFIG = {
        apiBaseUrl: isPublicFrontendHost ? 'https://cs-course-atlas-api.onrender.com' : ''
    };
})();
