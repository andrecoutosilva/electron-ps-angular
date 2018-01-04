import { Injectable } from '@angular/core';
import { Menu } from './menu';
//import { MenuItem } from './menu-item';
import { MENUS } from './mock-menus';

@Injectable()
export class MenusService {

  menu: Menu;

  constructor() { 
    this.menu = MENUS;
  }

  getMenu() : Menu {
    return this.menu;
  }
}
