const { Menu } = require('electron')
const powerShellRunner = require('./ps-runner') 
const settings = require('electron-settings');

const template = [
    {
        label: 'File',
        submenu: [
          { role: 'toggledevtools' },
          { role: 'reload' },
          {role: 'forcereload'},
          { role: 'close' }
        ]
    },
    {
      label: 'Tools',
      submenu: [
        {
          label: 'Clean Packages',
            click () {
              console.log("Cleaning Packages...");

              let packagesPaths = settings.get('packagesPaths');
              
              powerShellRunner.runScript(packagesPaths.paths)
              .then(output => {
                  console.log("Packages cleaned.");
              });
            }
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    }
  ]

   const menu = Menu.buildFromTemplate(template)
   
   Menu.setApplicationMenu(menu)
  
  console.log("Menu created!");