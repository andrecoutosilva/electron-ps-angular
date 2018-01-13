export class MenuItem {
    
    title: string = '';
    route: string = '';
    
    constructor(values: Object = {})
    {
        Object.assign(this, values);
    }
}
