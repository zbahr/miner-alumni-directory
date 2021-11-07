export default class GetAlumniSuccessfulAction{
    state = {name: '', data: []}

    constructor(data){
        this.state = {name: 'GetAlumniSuccessfulAction', data: data};
        // this.state({data: data});
    }

    getName(){
        return this.state.name;
    }

    getData(){
        return this.state.data;
    }
}