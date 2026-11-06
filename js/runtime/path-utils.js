(function initCSAtlasPathUtils(global) {
    'use strict';

    if (!global || !global.document) return;

    const namespace = global.CSAtlasRuntime = global.CSAtlasRuntime || {};

    function safeString(value) {
        return typeof value === 'string' ? value.trim() : '';
    }

    function escapeRegExp(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function isAbsoluteAssetUrl(value) {
        const raw = safeString(value);
        if (!raw) return false;
        return /^(?:[a-zA-Z][a-zA-Z\d+\-.]*:)?\/\//.test(raw)
            || raw.startsWith('data:')
            || raw.startsWith('blob:')
            || raw.startsWith('mailto:')
            || raw.startsWith('tel:');
    }

    function getScriptDerivedBasePath(scriptPathHint = 'js/script.js') {
        if (!global.document || !global.location) return '';
        const normalizedHint = safeString(scriptPathHint)
            .replace(/^[./]+/, '')
            .replace(/^\/+/, '');
        const hintPattern = normalizedHint || 'js/script.js';
        const scripts = Array.from(global.document.querySelectorAll('script[src]'));
        const scriptEl = scripts.find((entry) => safeString(entry.getAttribute('src')).includes(hintPattern));
        const scriptSrc = safeString(scriptEl?.getAttribute('src'));
        if (!scriptSrc) return '';

        try {
            const parsed = new URL(scriptSrc, global.location.href);
            const matcher = new RegExp(`/${escapeRegExp(hintPattern)}(?:\\?.*)?$`, 'i');
            return parsed.pathname.replace(matcher, '').replace(/\/+$/, '');
        } catch (_error) {
            return '';
        }
    }

    function withBasePath(path, basePath) {
        const normalizedPath = safeString(path);
        const normalizedBase = safeString(basePath).replace(/\/+$/, '');
        if (!normalizedPath) return normalizedPath;
        if (!normalizedPath.startsWith('/')) return normalizedPath;
        if (!normalizedBase) return normalizedPath;
        return `${normalizedBase}${normalizedPath}`;
    }

    function withAppBasePath(path, explicitBasePath = '') {
        const normalizedPath = safeString(path);
        if (!normalizedPath) return normalizedPath;
        if (isAbsoluteAssetUrl(normalizedPath)) return normalizedPath;
        const basePath = safeString(explicitBasePath) || getScriptDerivedBasePath();

        if (normalizedPath.startsWith('/')) {
            return withBasePath(normalizedPath, basePath);
        }

        return withBasePath(`/${normalizedPath.replace(/^\/+/, '')}`, basePath);
    }

    function resolveAssetUrl(assetPath, explicitBasePath = '') {
        return withAppBasePath(assetPath, explicitBasePath);
    }

    namespace.pathUtils = namespace.pathUtils || {};
    namespace.pathUtils.safeString = safeString;
    namespace.pathUtils.isAbsoluteAssetUrl = isAbsoluteAssetUrl;
    namespace.pathUtils.getScriptDerivedBasePath = getScriptDerivedBasePath;
    namespace.pathUtils.withBasePath = withBasePath;
    namespace.pathUtils.withAppBasePath = withAppBasePath;
    namespace.pathUtils.resolveAssetUrl = resolveAssetUrl;

    namespace.isAbsoluteAssetUrl = isAbsoluteAssetUrl;
    namespace.getScriptDerivedBasePath = getScriptDerivedBasePath;
    namespace.withAppBasePath = withAppBasePath;
    namespace.resolveAssetUrl = resolveAssetUrl;
})(typeof window !== 'undefined' ? window : undefined);
