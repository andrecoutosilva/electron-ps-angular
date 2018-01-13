import { MenuItem } from './menu-item';

export class Menu {

    menuItems : Array<MenuItem> = new Array<MenuItem>();

    constructor(values: Object = {})
    {
        Object.assign(this, values);
    }
}
