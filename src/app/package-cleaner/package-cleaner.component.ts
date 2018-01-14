import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
// import * as powerShellRunner from 'node-powershell';

@Component({
  selector: 'app-package-cleaner',
  templateUrl: './package-cleaner.component.html',
  styleUrls: ['./package-cleaner.component.css']
})
export class PackageCleanerComponent implements OnInit {
  folders: { id: number ; path: string; }[];
  isCleaning: boolean = false;

  constructor(private _electronService: ElectronService) { }

  ngOnInit() {
    this.getPackagesFolders();
  }

  getPackagesFolders()
  {
    if(this._electronService.isElectronApp) {
        
      let settings = this._electronService.ipcRenderer.sendSync('getSettings');
      
      console.log(settings);

      this.folders = settings.paths;
    
    } else 
    {
      this.folders = [
        { id: 1, path: "C:\\Users\\andre.silva\\.nuget\\packages" } ,
        { id: 2, path: "C:\\PrjNET\\Mainline\\_localPackages" } ,
        { id: 3, path: "C:\\PrjNET\\Mainline\\_Packages" } ,
      ]
    }
  }
  
  cleanPackages() {
    
    if(this._electronService.isElectronApp) {
      
      this.isCleaning = true;
      
      console.log("Cleaning...");

      let result = this._electronService.ipcRenderer.sendSync('cleanPackages');

      console.log("Cleaned!");
      this.isCleaning = false;
    } 
  }
}
