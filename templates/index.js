/**
 * Template for category index pages
 * @param {Object} options - Template options
 * @param {string} options.title - Page title
 * @param {string} options.cssPath - Relative path to CSS file
 * @param {string} options.basePath - Base path for navigation links
 * @param {string} options.jsPath - Relative path to search.js
 * @param {string} options.combinedList - HTML list of files and subdirectories
 * @param {Object} options.foldersWithContent - Object mapping folder names to whether they have content
 * @param {string} options.campaignName - Campaign name from configuration
 * @param {Object} options.sectionTitles - Section title mappings from configuration
 * @returns {string} Complete HTML page
 */
function renderIndexTemplate({ title, cssPath, basePath, jsPath, combinedList, foldersWithContent = {}, campaignName = 'D&D Campaign', sectionTitles = {} }) {
    // Build sections from configured folders, excluding _images
    const sections = Object.keys(foldersWithContent)
        .filter(folder => folder !== '_images' && foldersWithContent[folder] !== false)
        .map(folder => ({
            folder: folder,
            title: sectionTitles[folder] || folder.replace(/^\d+_/, '').replace(/_/g, ' ')
        }));

    const navItems = sections.map(section => 
        `<li><a href="${basePath}${section.folder}/index.html">${section.title}</a></li>`
    ).join('\n                ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${campaignName}</title>
    <link rel="preload" href="${basePath}images/background.jpeg" as="image">
    <style>
        body { 
            margin: 0; 
            background: #0a0a0b; 
            color: #ffffff; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', roboto, sans-serif;
            opacity: 0;
            transition: opacity 0.1s ease-in;
        }
        body.loaded { opacity: 1; }
    </style>
    <link rel="stylesheet" href="${cssPath}">
</head>
<body>
    <nav>
        <div class="nav-container">
            <ul>
                ${navItems}
            </ul>
        </div>
    </nav>
    <main>
        <h1>${title}</h1>
        <ul class="file-list">
            ${combinedList}
        </ul>
    </main>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('loaded');
        });
    </script>
    <script>
        // Live reload WebSocket connection
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            const ws = new WebSocket('ws://localhost:35729');
            ws.onmessage = function(event) {
                if (event.data === 'reload') {
                    console.log('📄 Reloading page...');
                    location.reload();
                }
            };
            ws.onopen = function() {
                console.log('🔌 Connected to live reload server');
            };
            ws.onclose = function() {
                console.log('🔌 Disconnected from live reload server');
            };
        }
    </script>
    <script src="${jsPath}"></script>
</body>
</html>`;
}

module.exports = { renderIndexTemplate };