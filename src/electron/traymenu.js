const { Menu, Tray } = require('electron')
const powerShellRunner = require('./ps-runner') 
const settings = require('electron-settings');

const path = require('path')
const iconPath = path.join(__dirname, '../assets/elevation.png');

tray = new Tray(iconPath);

const contextMenu = Menu.buildFromTemplate([
    {
        label: 'Clean Packages', click: function() {
            console.log("Cleaning Packages...");
            let packagesPaths = settings.get('packagesPaths');
    
            powerShellRunner.runScript(packagesPaths.paths)
            .then(output => {
                console.log("Packages Cleaned.");
            });
        }
    },
])

tray.setToolTip('Elevation Power Shell')
tray.setContextMenu(contextMenu)

console.log("Tray created!");