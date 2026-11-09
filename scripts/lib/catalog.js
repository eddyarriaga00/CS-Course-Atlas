// The module catalog (ids, titles, descriptions, topics, track of each module, learning order and
// which tracks are published) lives in data/module-catalog.json. Every build and check script reads
// it through here.
const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, '..', '..', 'data', 'module-catalog.json');

function loadCatalog() {
    const data = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
    return {
        MODULE_CATEGORY_BY_ID: data.categoryById,
        MODULE_LEARNING_SEQUENCE: data.sequence,
        PUBLISHED_TRACKS: data.publishedTracks,
        modules: data.modules
    };
}

module.exports = { loadCatalog, CATALOG_PATH };
