import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';

import { Menu } from './menu/menu';
import { MenuItem } from './menu/menu-item';
import { MenusService } from './services/menus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ MenusService ]
})
export class AppComponent {
  
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private menusService: MenusService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
  ) 
  {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  get menuItems() {
    let menu = this.menusService.getMenu();
    return menu.menuItems;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
