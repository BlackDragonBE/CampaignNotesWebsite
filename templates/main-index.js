/**
 * Template for the main homepage
 * @param {Object} foldersWithContent - Object mapping folder names to whether they have content
 * @param {string} campaignName - Campaign name from configuration
 * @param {Object} sectionTitles - Section title mappings from configuration
 * @returns {string} Complete HTML page
 */
function renderMainIndexTemplate(foldersWithContent = {}, campaignName = 'D&D Campaign', sectionTitles = {}) {
    // Build sections from configured folders, excluding _images
    const sections = Object.keys(foldersWithContent)
        .filter(folder => folder !== '_images' && foldersWithContent[folder] !== false)
        .map(folder => ({
            folder: folder,
            title: sectionTitles[folder] || folder.replace(/^\d+_/, '').replace(/_/g, ' ')
        }));

    const navItems = sections.map(section => 
        `<li><a href="${section.folder}/index.html">${section.title}</a></li>`
    ).join('\n                ');

    const sectionCards = sections.map(section => 
        `<a href="${section.folder}/index.html" class="section-card-link">
                <div class="section-card">
                    <h2>${section.title}</h2>
                </div>
            </a>`
    ).join('\n            ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${campaignName}</title>
    <link rel="preload" href="images/background.jpeg" as="image">
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
    <link rel="stylesheet" href="styles.css">
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
        <h1>${campaignName}</h1>
        
        <div class="section-grid">
            ${sectionCards}
        </div>
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
    <script src="search.js"></script>
</body>
</html>`;
}

module.exports = { renderMainIndexTemplate };