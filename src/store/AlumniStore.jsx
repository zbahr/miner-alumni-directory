import Alumni from '../Models/Alumni.jsx'
export default class AlumniStore {
    constructor(){
        this.state = {Alumni: {}};
    }

    handleAction(action) {
        var result = action.getName();
        switch(result){
            case 'GetAlumniSuccessfulAction':
                this.addAllAlumni(action);
                break;
            default:
                break;
        };
    }

    addAllAlumni(action){ 
        var alu = this.state.Alumni;
        var data = action.getData();
        for(var i=0; i<data.length; i++){
            var tmp = new Alumni();
            tmp.email = data[i].email.data;
            tmp.name = data[i].name.data;
            tmp.featured = data[i].featured.data;
            tmp.last_name = data[i].last_name.data;
            tmp.state = data[i].state.data;
            tmp.work_city = data[i].work_city.data;
            tmp.work_title = data[i].work_title.data;
            tmp.business_name = data[i].business_name.data;
            tmp.work_zipcode = data[i].work_zipcode.data;
            tmp.grad_date = data[i].grad_date.data;
            tmp.major = data[i].major.data;
            tmp.pic_url = data[i].pic_url.data;
            tmp.previous_work = data[i].previous_work.data;
            tmp.previous_title = data[i].previous_title.data;
            tmp.linkedInURL = data[i].linkedInURL.data;
            tmp.approved = data[i].approved.data;
            tmp.id = data[i].id.data;
            var value = alu[data[i].name.data];
            if(value == undefined){
                alu[data[i].name.data] = tmp;
            }
        }
    }

    removeFeatured(person){
        this.state.Alumni[person.name].featured = "no";
    }

    addAlumni(person){
       this.state.Alumni[person.name] = person;
    }

    getAllAlumni() {
        return this.state.Alumni;
    }

    getFeaturedAlumni(){
        var keys = Object.keys(this.state.Alumni);
        var tmp;

        for(var i=0; i<keys.length; i++){
            tmp = this.state.Alumni[keys[i]];
            if(tmp.featured == "yes"){
                return tmp;
            }
        }

        return null;
    }

    removeAlumni(name){
        delete this.state.Alumni[name];
    }

    getApprovedAlumni(){
        var approved = {};
        var keys = Object.keys(this.state.Alumni);
        var tmp;

        for(var i=0; i<keys.length; i++){
            tmp = this.state.Alumni[keys[i]];
            if(tmp.approved == "yes"){
                approved[keys[i]] = this.state.Alumni[keys[i]];
            }
        }

        return approved;
    }

    getUnapprovedAlumni(){
        var approved = {};
        var keys = Object.keys(this.state.Alumni);
        var tmp;

        for(var i=0; i<keys.length; i++){
            tmp = this.state.Alumni[keys[i]];
            if(tmp.approved == "no"){
                approved[keys[i]] = this.state.Alumni[keys[i]];
            }
        }

        return approved;
    }

    getFilteredAlumni(searchData) {
        this.state.FilteredAlumni = {};
        var filteredAlumni = this.state.FilteredAlumni;
        var keys = Object.keys(this.state.Alumni);
        var values = Object.values(this.state.Alumni);

        for (var i = 0; i < keys.length; i++) {
            if (values[i].approved == "no") { continue; }
            if (searchData.name != "" && searchData.name != values[i].name) { continue; }
            if (searchData.last_name != "" && searchData.last_name != values[i].last_name) { continue; }
            if (searchData.state != "" && searchData.state != values[i].state) { continue; }
            if (searchData.business_name != "" && searchData.business_name != values[i].business_name) { continue; }
            if (searchData.gradYear != "" && searchData.gradYear != values[i].grad_date) { continue; }
            if (searchData.major != "" && searchData.major != values[i].major) { continue; }

            filteredAlumni[keys[i]] = values[i];
        }

        return this.state.FilteredAlumni;
    }
}