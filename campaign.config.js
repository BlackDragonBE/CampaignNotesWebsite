/**
 * Campaign Configuration
 * 
 * This file contains all the configurable settings for your D&D campaign website.
 * Edit these values to customize the website for your specific campaign.
 */

const path = require('path');

const config = {
    // Campaign Information
    campaignName: 'My Campaign Name',
    
    // Source Directory (where your Obsidian vault is located)
    // Can be relative to this project or an absolute path
    sourceDirectory: path.join(__dirname, '..', 'CampaignNotes'),
    
    // Folders to process from your Obsidian vault
    // These folders will be converted to website sections
    foldersToProcess: [
        '1_SessionNotes', 
        '2_Locations',
        '3_Characters',
        '4_Items',
        '5_Concepts',
        '7_Quests',
        '8_Custom',
        '_images'  // This folder contains images and is handled specially
    ],
    
    // Section titles for navigation
    // Maps folder names to display names in the website navigation
    sectionTitles: {
        '1_SessionNotes': 'Session Notes',
        '2_Locations': 'Locations', 
        '3_Characters': 'Characters',
        '4_Items': 'Items',
        '5_Concepts': 'Concepts',
        '7_Quests': 'Quests',
        '8_Custom': 'Custom'
    },
    
    // Optional: Leaflet Map Data Path
    // Path to leaflet map data file, if you're using the leaflet-map feature
    leafletDataPath: '_data/LeafletMaps/plugins/obsidian-leaflet-plugin/data.json'
};

// Export the configuration
module.exports = config;

// Example configurations for other campaigns:

/*
// Example: Waterdeep Dragon Heist Campaign
const waterdeeperDragonHeistConfig = {
    campaignName: 'Waterdeep: Dragon Heist',
    sourceDirectory: path.join(__dirname, '..', 'WaterdeepDragonHeist'),
    foldersToProcess: [
        'Sessions',
        'Locations', 
        'NPCs',
        'Factions',
        'Quests',
        'Items',
        '_images'
    ],
    sectionTitles: {
        'Sessions': 'Session Notes',
        'Locations': 'Locations',
        'NPCs': 'Characters', 
        'Factions': 'Factions',
        'Quests': 'Quests',
        'Items': 'Items'
    }
};
*/

/*
// Example: Custom Homebrew Campaign  
const homebrewConfig = {
    campaignName: 'Tales of Aethermoor',
    sourceDirectory: path.join(__dirname, '..', 'AethermoorCampaign'),
    foldersToProcess: [
        'GameSessions',
        'WorldBuilding',
        'Characters',
        'Lore',
        'Adventures', 
        'Magic Items',
        '_assets'
    ],
    sectionTitles: {
        'GameSessions': 'Sessions',
        'WorldBuilding': 'World',
        'Characters': 'Characters',
        'Lore': 'Lore', 
        'Adventures': 'Adventures',
        'Magic Items': 'Items'
    }
};
*/