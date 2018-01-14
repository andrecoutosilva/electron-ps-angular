//handle setupevents as quickly as possible
const setupEvents = require('./src/electron/installers/setupEvents')

if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const settings = require('electron-settings');
const iconPath = path.join(__dirname, './dist/assets/elevation.ico');
const powerShellRunner = require('./src/electron/ps-runner') 

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    require('./src/electron/mainmenu')
    require('./src/electron/traymenu')
    // Create the browser window.
    // win = new BrowserWindow({width: 800, height: 600, frame: false})
    win = new BrowserWindow({
        width: 900, 
        height: 700,
        icon: iconPath
    })
    
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    //win.loadURL('file://${__dirname}/dist/index.html')
    
    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// Listen for async message from renderer process
ipcMain.on('async', (event, arg) => {  
    // Print 1
    console.log(arg);
    // Reply on async message from renderer process
    event.sender.send('async-reply', 2);
});

// Listen for sync message from renderer process
ipcMain.on('sync', (event, arg) => {  
    // Print 3
    console.log(arg);
    // Send value synchronously back to renderer process
    event.returnValue = 4;
    // Send async message to renderer process
    //mainWindow.webContents.send('ping', 5);
});

// Listen for sync message from renderer process
ipcMain.on('ping', (event, arg) => {  
    // Print 3
    console.log(arg);
    // Send value synchronously back to renderer process
    event.returnValue = 5;
    // Send async message to renderer process
    //mainWindow.webContents.send('ping', 5);    
});

ipcMain.on('getSettings', (event, arg) => {
    
    let hasPaths = settings.has('packagesPaths');
    
    if (!hasPaths)
    {
        settings.set('packagesPaths', {
            paths : [
                { id: 1, path: "C:\\Users\\{{username}}\\.nuget\\packages" } ,
                { id: 2, path: "C:\\PrjNET\\Mainline\\{{ProjectName}}\\_localPackages" } ,
                { id: 3, path: "C:\\PrjNET\\Mainline\\{{ProjectName}}\\_Packages" } ,
            ]
        });
    }

    event.returnValue = settings.get('packagesPaths');
});

ipcMain.on('setSettings', (event, arg) => {
    console.log(arg);
    settings.set('packagesPaths.paths', arg);
    event.returnValue = arg;
});


ipcMain.on('cleanPackages', (event, arg) => {
    console.log("Cleaning Packages...");

    let packagesPaths = settings.get('packagesPaths');
    
    powerShellRunner.runScript(packagesPaths.paths)
    .then(output => {
        event.returnValue = "Done Cleaning!";
    });
});

// Make method externaly visible
exports.pong = arg => {  
    //Print 6
    console.log(arg);
}
