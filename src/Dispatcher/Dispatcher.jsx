export default class Dispatcher{

    constructor(){
        this.state = { stores: [] };
        this.register = this.register.bind(this);
    }

    register(store){
        var storesCurrent = this.state.stores;
        if(!this.state.stores.includes(store)){
            storesCurrent.push(store);
        }
        return storesCurrent;
    }

    dispatch(action){
        this.state.stores.forEach(store => {
            store.handleAction(action);
        });
    }
}