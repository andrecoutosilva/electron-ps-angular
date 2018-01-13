import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FormBuilder } from '@angular/forms/src/form_builder';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  folders: { id: number ; path: string; }[];
  isSaveDisabled: boolean = true;
  isEditDisabled: boolean = false;
  isReadOnly: boolean = true;

  constructor(private _electronService: ElectronService) { }
  
  
  projectName = "";
  
  settings = {
    projectName : "",
  };

  ngOnInit() {
    this.getSettings();
  }

  public getSettings() {

    if(this._electronService.isElectronApp) {
        
      let settings = this._electronService.ipcRenderer.sendSync('getSettings');
      
      console.log(settings);

      this.folders = settings.paths;
    
    } else 
    {
      // this.folders = [
      //   "C:\\Users\\user.name\\.nuget\\packages" ,
      //   "C:\\PrjNET\\Projeto Teste\\Mainline\\_Packages" ,
      //   "C:\\PrjNET\\Projeto Teste\\Mainline\\_localPackages" ,
      // ]
      // this.folders = [
      //   { path: "C:\\PrjNET\\Mainline\\_localPackages" } ,
      //   { path: "C:\\PrjNET\\Mainline\\_Packages" } ,
      //   { path: "C:\\Users\\andre.silva\\.nuget\\packages" } ,
      // ]
      this.folders = [
        { id: 1, path: "C:\\Users\\andre.silva\\.nuget\\packages" } ,
        { id: 2, path: "C:\\PrjNET\\Mainline\\_localPackages" } ,
        { id: 3, path: "C:\\PrjNET\\Mainline\\_Packages" } ,
      ]
    }
  }

  saveSettings() {
    if(this._electronService.isElectronApp) {
      let settingsResult = this._electronService.ipcRenderer.sendSync('setSettings', this.folders);
      console.log(settingsResult);
    }
  }

  onSubmit() { 
    console.log("Form submitted!");
    console.log("Project name is: " + this.projectName);
    this.settings.projectName = this.projectName;
    this.updateFolders(this.settings.projectName);
    this.isReadOnly = true;
    this.isSaveDisabled = true;
    this.isEditDisabled = false;
    this.saveSettings();
  }

  onEdit() {
    this.isReadOnly = !this.isReadOnly;
    this.isEditDisabled = true;
    this.isSaveDisabled = false;    
  }

  onSave() {
    // this.isReadOnly = true;
    // this.isSaveDisabled = true;
    // this.isEditDisabled = false;
  }

  private updateFolders(projectName) {
    // this.folders = [
    //   { path: "C:\\Users\\andre.silva\\.nuget\\packages"} ,
    //   { path: "C:\\PrjNET\\"+ projectName +"\\Mainline\\_Packages"} ,
    //   { path: "C:\\PrjNET\\"+ projectName +"\\Mainline\\_localPackages"} ,
    // ]
  }
}
