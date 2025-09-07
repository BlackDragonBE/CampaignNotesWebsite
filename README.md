# D&D Campaign Website Generator

This project automatically generates a static website from campaign notes stored in an Obsidian vault. See this repository for an example: https://github.com/BlackDragonBE/CampaignNotes  
See https://blackdragonbe.github.io/CampaignNotesWebsite to see this template in action.

## Features

- **Campaign Agnostic**: Works with any D&D campaign by configuring the settings
- Converts Obsidian markdown files to HTML with `[[Link]]` syntax support
- Creates navigation structure based on your folder organization
- Responsive design with gothic D&D theme
- Development server with live reload and file watching
- Global search functionality with fuzzy matching
- Automatic GitHub Pages deployment
- Interactive maps support (Leaflet maps from Obsidian plugin)

## Quick Start

1. **Clone this repository**:
   ```bash
   git clone https://github.com/BlackDragonBE/CampaignNotesWebsite
   cd Website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure your campaign** (see [Configuration](#configuration) section below):
   - Edit `campaign.config.js` to point to your Obsidian vault
   - Set your campaign name and folder structure

4. **Start development server**:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to see your campaign website!

## Configuration

Edit `campaign.config.js` to customize for your campaign:

```javascript
const config = {
    // Campaign Information
    campaignName: 'Your Campaign Name',
    
    // Source Directory (where your Obsidian vault is located)
    sourceDirectory: path.join(__dirname, '..', 'YourCampaignNotes'),
    
    // Folders to process from your Obsidian vault
    foldersToProcess: [
        'Sessions',      // Your session notes
        'Locations',     // Places and areas
        'Characters',    // NPCs and PCs
        'Items',         // Equipment and artifacts
        'Lore',         // Background information
        'Quests',       // Quest tracking
        '_images'       // Images (always include this)
    ],
    
    // Section titles for navigation
    sectionTitles: {
        'Sessions': 'Session Notes',
        'Locations': 'Locations', 
        'Characters': 'Characters',
        'Items': 'Items',
        'Lore': 'Lore',
        'Quests': 'Quests'
    }
};
```

### Example Configurations

See the comments in `campaign.config.js` for examples of different campaign setups:
- Waterdeep: Dragon Heist configuration
- Custom homebrew campaign setup

## Commands

- **Development server**: `npm run dev` - Starts server with live reload
- **Build website**: `npm run build` - Generates complete website in `docs/` folder  
- **Preview build**: `npm start` - Build and serve locally on localhost:3000

## GitHub Pages Deployment

### Prerequisites
- **Public Repository Required**: GitHub Pages with free accounts only works with public repositories. If your repository is private, you'll need a GitHub Pro account or make the repository public.
- Make sure you have a `.github/workflows/deploy.yml` file in your repository for automatic deployment.

### Setup Steps

1. **Push this repository to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit with campaign configuration"
   git push origin main
   ```

2. **Configure GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under "Source", select **"GitHub Actions"**
   - The workflow will automatically deploy your site when you push to the main branch

3. **Verify Deployment**:
   - Go to the **Actions** tab in your repository to monitor the deployment
   - Once successful, your website will be available at: `https://[your-username].github.io/[repository-name]/`

### Automatic Deployment Workflow

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
- Automatically trigger on every push to the `main` branch
- Install dependencies with `npm install`
- Build the website with `npm run build`
- Deploy the generated `docs/` folder to GitHub Pages

### Manual Deployment Alternative

If you prefer manual deployment:
1. Run `npm run build` locally
2. Commit the generated `docs/` folder changes
3. Push to GitHub
4. In repository Settings > Pages, set Source to "Deploy from a branch" and select `main` branch, `/docs` folder

### Troubleshooting Deployment

**Deployment failing?**
- Check the Actions tab for error details
- Ensure your `campaign.config.js` points to a valid source directory
- Make sure your source vault exists and contains the configured folders

**Site not updating?**
- Verify the deployment completed successfully in the Actions tab  
- GitHub Pages may take a few minutes to reflect changes
- Check that you're viewing the correct URL: `https://[your-username].github.io/[repository-name]/`

**Repository is private?**
- GitHub Pages requires a public repository with free accounts
- Either make your repository public or upgrade to GitHub Pro

## Folder Structure Requirements

Your Obsidian vault should be organized with the folders you specify in `foldersToProcess`. Common structures:

**Option 1: Numbered folders (like original)**:
```
YourCampaignNotes/
├── 1_SessionNotes/
├── 2_Locations/  
├── 3_Characters/
├── 4_Items/
├── 5_Concepts/
└── _images/
```

**Option 2: Named folders**:
```
YourCampaignNotes/
├── Sessions/
├── WorldBuilding/
├── NPCs/
├── Equipment/ 
├── Lore/
└── _assets/ (rename to _images in config)
```

## Obsidian Features Supported

- **Internal Links**: `[[Page Name]]` and `[[Page Name|Display Text]]`
- **Image Links**: `![[image.jpg]]` with sizing and alignment options
- **YAML Frontmatter**: Properties displayed on each page
- **Nested Folders**: Subfolders are processed automatically
- **Header Links**: `[[Page Name#Header]]` for linking to specific sections

## Development Workflow

Use `npm run dev` for content editing and theme development:

- **Live Reload**: Browser automatically refreshes when files change
- **File Watching**: Monitors source markdown files, images, and build scripts
- **Auto-rebuild**: Regenerates the site when changes are detected  
- **Console Feedback**: Shows which files changed and build status

Perfect for testing content updates, CSS changes, and campaign additions!

## Generated Structure

```
docs/
├── index.html              # Main homepage with campaign overview
├── styles.css              # Site styling  
├── search.js              # Search functionality
├── images/                # Copied from _images folder
├── [YourFolder1]/
│   ├── index.html         # Section index page
│   └── [converted-files].html
├── [YourFolder2]/
└── ...
```

## Troubleshooting

**Links not working?** 
- Make sure filenames in your vault match the `[[Link]]` text exactly
- Check that linked files are in folders specified in `foldersToProcess`

**Images not showing?**
- Ensure images are in the `_images` folder in your vault
- Use `![[filename.jpg]]` syntax in your markdown files

**Site not building?**
- Verify your `sourceDirectory` path in `campaign.config.js` is correct
- Make sure the specified folders exist in your Obsidian vault
- Check console output for specific error messages

## Contributing

This project is designed to be flexible for any D&D campaign. If you have improvements or bug fixes, feel free to submit a pull request!