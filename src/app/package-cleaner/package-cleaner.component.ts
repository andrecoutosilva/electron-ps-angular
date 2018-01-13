import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-cleaner',
  templateUrl: './package-cleaner.component.html',
  styleUrls: ['./package-cleaner.component.css']
})
export class PackageCleanerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get messages() {
    return [
      { from: "C:\\Users\\andre.silva\\.nuget\\packages"} ,
      { from: "C:\\Users\\andre.silva\\.nuget\\packages"} ,
      { from: "C:\\Users\\andre.silva\\.nuget\\packages"} ,
    ]
  }
}
