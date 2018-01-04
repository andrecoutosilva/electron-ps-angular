export class MenuItem {
    
    title: string = '';

    constructor(values: Object = {})
    {
        Object.assign(this, values);
    }
}
