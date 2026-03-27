(function initCSAtlasAssetLoader(global) {
    'use strict';

    if (!global || !global.document) return;

    const namespace = global.CSAtlasRuntime = global.CSAtlasRuntime || {};
    const pathUtils = namespace.pathUtils || {};
    const sharedPromises = new Map();

    function safeString(value) {
        return typeof value === 'string' ? value.trim() : '';
    }

    function resolveAssetUrl(rawValue, basePath = '') {
        const value = safeString(rawValue);
        if (!value) return value;

        if (typeof namespace.resolveAssetUrl === 'function') {
            return namespace.resolveAssetUrl(value, basePath);
        }
        if (typeof pathUtils.resolveAssetUrl === 'function') {
            return pathUtils.resolveAssetUrl(value, basePath);
        }
        return value;
    }

    function getPromiseCache(cacheMap) {
        return cacheMap instanceof Map ? cacheMap : sharedPromises;
    }

    function loadScriptOnce(options = {}) {
        const {
            id,
            src,
            readyCheck,
            defer = true,
            cacheMap = null,
            basePath = '',
            attributes = null
        } = options;

        if (typeof readyCheck === 'function' && readyCheck()) {
            return Promise.resolve(true);
        }

        const resolvedSrc = resolveAssetUrl(src, basePath);
        const cache = getPromiseCache(cacheMap);
        const cacheKey = safeString(id) || `script:${resolvedSrc}`;
        const existingPromise = cache.get(cacheKey);
        if (existingPromise) return existingPromise;

        const promise = new Promise((resolve) => {
            let script = id ? global.document.getElementById(id) : null;
            let settled = false;
            const finish = (ok) => {
                if (settled) return;
                settled = true;
                if (ok && script) script.dataset.loaded = 'true';
                resolve(Boolean(ok));
            };
            const onLoad = () => finish(typeof readyCheck === 'function' ? readyCheck() : true);
            const onError = () => finish(false);

            if (!script) {
                script = global.document.createElement('script');
                if (id) script.id = id;
                script.src = resolvedSrc;
                script.defer = Boolean(defer);
                script.dataset.loaded = 'false';
                if (attributes && typeof attributes === 'object') {
                    Object.entries(attributes).forEach(([key, value]) => {
                        if (!key) return;
                        script.setAttribute(key, String(value));
                    });
                }
                script.addEventListener('load', onLoad, { once: true });
                script.addEventListener('error', onError, { once: true });
                global.document.head.appendChild(script);
                return;
            }

            const currentSrc = safeString(script.getAttribute('src'));
            if (currentSrc !== resolvedSrc) {
                script.dataset.loaded = 'false';
                script.setAttribute('src', resolvedSrc);
            }

            if (script.dataset.loaded === 'true') {
                finish(typeof readyCheck === 'function' ? readyCheck() : true);
                return;
            }

            script.addEventListener('load', onLoad, { once: true });
            script.addEventListener('error', onError, { once: true });
        }).then((ok) => {
            if (!ok) cache.delete(cacheKey);
            return ok;
        });

        cache.set(cacheKey, promise);
        return promise;
    }

    function loadStylesheetOnce(options = {}) {
        const {
            id,
            href,
            cacheMap = null,
            basePath = '',
            attributes = null
        } = options;

        const resolvedHref = resolveAssetUrl(href, basePath);
        const cache = getPromiseCache(cacheMap);
        const cacheKey = safeString(id) || `style:${resolvedHref}`;
        const existingPromise = cache.get(cacheKey);
        if (existingPromise) return existingPromise;

        const promise = new Promise((resolve) => {
            let link = id ? global.document.getElementById(id) : null;
            if (!link) {
                link = global.document.createElement('link');
                if (id) link.id = id;
                link.rel = 'stylesheet';
                link.href = resolvedHref;
                if (attributes && typeof attributes === 'object') {
                    Object.entries(attributes).forEach(([key, value]) => {
                        if (!key) return;
                        link.setAttribute(key, String(value));
                    });
                }
                link.addEventListener('load', () => resolve(true), { once: true });
                link.addEventListener('error', () => resolve(false), { once: true });
                global.document.head.appendChild(link);
                return;
            }

            const currentHref = safeString(link.getAttribute('href'));
            if (currentHref !== resolvedHref) {
                link.setAttribute('href', resolvedHref);
            }
            resolve(true);
        }).then((ok) => {
            if (!ok) cache.delete(cacheKey);
            return ok;
        });

        cache.set(cacheKey, promise);
        return promise;
    }

    namespace.assetLoader = namespace.assetLoader || {};
    namespace.assetLoader.sharedPromises = sharedPromises;
    namespace.assetLoader.loadScriptOnce = loadScriptOnce;
    namespace.assetLoader.loadStylesheetOnce = loadStylesheetOnce;
})(typeof window !== 'undefined' ? window : undefined);
