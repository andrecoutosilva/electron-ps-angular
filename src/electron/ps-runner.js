const powershell = require('node-powershell');
const notifier = require('electron-notification-desktop')

module.exports = {
    runScript: function (paths) {
        return new Promise(
            function (resolve, reject) {
                if (paths != null && paths != undefined) {
                    
                    // Create the PS Instance
                    let ps = new powershell({
                        executionPolicy: 'Bypass',
                        noProfile: true
                    })
                    
                    let pathStrings = [];
                    
                    paths.forEach(pathObj => {
                        pathStrings.push(pathObj.path);
                    });
                    
                    ps.addCommand(`& "${require('path').resolve(__dirname, 'PackageCleaner.ps1')}"`, [{paths: pathStrings}])
                    
                    // Pull the Trigger
                    ps.invoke().then(output => {
                        console.log("Its done!")
                        console.log(output)            
                        console.log("output")
                        console.log(ps.history);
                        console.log("ps.history");
                        resolve("deleted!");
                        // Full Options 
                        notifier.notify('Packages Cleaned!', {
                            message: output,
                            //icon: "elevation.png"
                        })    
                    })
                    .catch(err => {
                        console.error(err)
                        ps.dispose()
                        reject("Failed!")
                    })
                }
            }
        );
    }
}