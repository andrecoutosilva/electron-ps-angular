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
}
