## CLAUDE MAIN RULES

- **Do not run any commands**: Claude Code should never execute commands like `npm install`, `npm run build`, or `npm start`. These are handled by the build system and development server.
- **Only edit source files**: Do not change generated files in the `docs/` folder as those get overwritten by the build process.

## Project Overview

This is a static website generator that converts an Obsidian vault containing D&D campaign notes into a GitHub Pages website. The build system transforms markdown files with Obsidian-style `[[internal links]]` into a structured HTML website with navigation and cross-references. The system is campaign-agnostic and can be configured for any D&D campaign through the `campaign.config.js` file.

## Commands

**Build and Development:**
```bash
npm install              # Install dependencies (marked, http-server, chokidar, ws)
npm run dev             # Development server with live reload and file watching
npm run build           # Generate complete website in docs/ folder
npm start               # Build and serve locally on localhost:3000
```

**Source Structure:**
- Source files location is configurable in `campaign.config.js` - defaults to `../CurseOfStrahdNotes/` (external Obsidian vault)
- Static CSS is in `src/styles.css` (edit this file for theme changes - gets copied to `docs/styles.css` during build)
- Generated website outputs to `docs/` folder for GitHub Pages
- Campaign configuration is in `campaign.config.js` - edit this to customize for different campaigns

## Architecture

### Modular Build System

The build system has been refactored into a modular architecture for better maintainability:

**Main Entry Point (`build.js`):**
- Orchestrates the build process (68 lines vs previous 591 lines)
- Imports and coordinates all modules
- Manages global search index

**Templates (`templates/`):**
- `page.js` - Individual content page template
- `index.js` - Category index page template  
- `main-index.js` - Homepage template
- HTML templates separated from logic for easier editing

**Library Modules (`lib/`):**
- `fs-utils.js` - File system operations (directory creation, file copying)
- `content-utils.js` - Content parsing (YAML frontmatter, HTML text extraction)
- `markdown-processor.js` - Markdown processing and Obsidian link resolution
- `search-utils.js` - Search index generation
- `folder-processor.js` - Folder traversal and processing logic

### Core Build Process

The build system follows this pipeline:

1. **File Mapping Phase:** Scans all markdown files to create a global filename → path mapping for link resolution
2. **Content Processing:** Converts each category folder, handling nested directories and Obsidian link syntax  
3. **HTML Generation:** Creates complete HTML pages using modular templates with consistent navigation and styling
4. **Asset Management:** Copies images and static CSS file

### Content Categories

The system processes folders as configured in `campaign.config.js`. The default configuration processes:
- `1_SessionNotes/` - Game session records (numbered 1_cos.md through 23_cos.md)
- `2_Locations/` - Places and maps 
- `3_Characters/` - NPCs with subfolders: `_Deity/`, `_Familiars/`, `_Players/`
- `4_Items/` - Magical items and artifacts
- `5_Concepts/` - Important lore and game concepts  
- `7_Quests/` - Status-organized: `Done/`, `Failed/`, `In Progress/`, `Inactive/`
- `8_Custom/` - Custom content
- `_images/` - Copied to `docs/images/`

**To customize for your campaign**: Edit the `foldersToProcess` and `sectionTitles` arrays in `campaign.config.js`.

### Link Resolution System

**Obsidian Link Processing:**
- Converts `[[Target]]` and `[[Target|Display Text]]` syntax
- Uses multiple matching strategies: exact, case-insensitive, hyphenated lowercase
- Calculates relative paths between files in different folders
- URL-encodes filenames with spaces (`Castle Ravenloft.html` → `Castle%20Ravenloft.html`)

**Key Functions (now modularized):**
- `buildFileMap()` (lib/markdown-processor.js) - Creates global file mapping for link resolution
- `resolveObsidianLink()` (lib/markdown-processor.js) - Handles various filename matching strategies  
- `processMarkdownFile()` (lib/markdown-processor.js) - Converts Obsidian syntax and generates HTML pages
- `renderPageTemplate()` (templates/page.js) - Generates individual page HTML
- `renderIndexTemplate()` (templates/index.js) - Generates category index HTML
- `renderMainIndexTemplate()` (templates/main-index.js) - Generates homepage HTML

### HTML Template Structure

Each page uses consistent navigation with links to all main sections. The build system generates:
- Individual HTML files for each markdown file (using `templates/page.js`)
- Index pages for each category folder (using `templates/index.js`)
- Main homepage with section overview cards (using `templates/main-index.js`)
- Single CSS file with responsive design

### Client-Side Features

**Search System (`docs/search.js`):**
- Global search across all content with fuzzy matching
- Real-time results with keyboard navigation (Ctrl+K shortcut)
- Searches titles, aliases, tags, content, and categories with weighted scoring
- Debounced input with caching for performance

**Hover Preview System (`docs/search.js`):**
- Shows content previews when hovering over internal links (`.html` files)
- 500ms delay before showing, 300ms delay before hiding
- Fetches and caches page content dynamically
- Automatically disabled on mobile/touch devices via `@media (hover: none)` CSS query
- Positions previews intelligently to stay within viewport bounds
- Extracts article content and converts relative URLs to absolute for proper display

## Deployment

**GitHub Actions:** Automatic deployment on push to `main` branch via `.github/workflows/deploy.yml`

**Manual Process:**
1. Run `npm run build` 
2. Commit `docs/` folder changes
3. Push to GitHub (Pages serves from `docs/` folder)

## Development Notes

**When modifying the build system:**
- The `foldersToProcess` array in `campaign.config.js` controls which source folders are processed (replaces old hardcoded `FOLDERS_TO_COPY`)
- Campaign name and section titles are configured in `campaign.config.js` and passed to all templates
- Navigation menus are dynamically generated from the configuration in all template files
- Link resolution depends on exact filename matching - changes to source file names may break internal links
- HTML templates are in separate files for easier editing - modify template files rather than inline strings
- Each module has a specific purpose - follow the separation of concerns when adding features

**Campaign Configuration:**
- Edit `campaign.config.js` to customize: campaign name, source directory, folders to process, and section titles
- The system is backward compatible - existing Curse of Strahd setups will work without changes
- See example configurations in `campaign.config.js` for different campaign types

**Content Updates:**
- Add new markdown files to appropriate category folders in source vault
- Images must be placed in source `_images/` folder (not the generated `docs/images/`)
- The build process is destructive - it completely regenerates the `docs/` folder each time