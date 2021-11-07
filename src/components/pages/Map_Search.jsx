import React, { Component } from 'react';
import AlumniStore from '../../store/AlumniStore.jsx';
import ActionCreator from '../../ActionCreator/firebase.jsx'
import MapContainer from '../../API/googleAPI';
import AlumniCard from '../../controls/alumniCard.jsx'
import Geocode from "react-geocode";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "../components.css"

var as = new AlumniStore();
var ac = new ActionCreator(as);

export default class Map_Search extends Component {
  constructor(){
    super();
    this.state = {
        alumni: {}, 
        coordinates: {},
        zipCode: {},
        searchOpen: true
    };
  }


  async componentWillMount() {
    await ac.getAlumni();
    var result = await as.getApprovedAlumni();
    var coords = await this.getCoordinates(result);
    this.setState({alumni: result, coordinates: coords});
  }

  async getCoordinates(alumni) {
    Geocode.setApiKey("AIzaSyB8C4oxxXZLkS11uPga8JIiXL5JRA9gXS4");
        var keys = Object.keys(alumni);
        var values = Object.values(alumni);
        var coords = [];

        for (var i = 0; i < keys.length; i++) {
            await Geocode.fromAddress(values[i].work_zipcode).then(
                response => {
                  const { lat, lng } = response.results[0].geometry.location;
                  coords[values[i].work_zipcode] = { lat, lng };
                },
                error => {
                  console.error(error);
                }
            );
        }

        return (coords);
  }

  handleClick(zipCode) {
    this.setState({zipCode: zipCode, searchOpen: false});
  }

  handleChange = panel => (event, searchOpen) => {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
};

  renderMap() {
    return (
        <div id="map-container">
            <br />
            <ExpansionPanel id="expansion-panel" expanded={this.state.searchOpen} onChange={this.handleChange()}>
                <ExpansionPanelSummary id="expansion-panel-summary" expandIcon={<ExpandMoreIcon />}>
                    <div class="pageTitle">
                        <header class="mapHeader">Search</header>
                    </div>
                </ExpansionPanelSummary>
                <div className="map">
                  <MapContainer handleClick={this.handleClick.bind(this)} markers={this.state.coordinates} />
                </div>
            </ExpansionPanel>
        </div>
    );
  }

  renderCards() {
    var array = [];
    var toRender = this.state.alumni;

    for (var key in toRender){
      if (toRender[key].work_zipcode == this.state.zipCode) {
        array.push(this.renderCard(toRender[key]));
      }
    }

    return array;
  }

  renderCard(element){
    return(
        <AlumniCard key={element.name} person={element} adminPage={false}/>
    );
  }

  render() {
    return(
      <div>
        {this.renderMap()}
        <div id = 'cards'>
          {this.renderCards()}
        </div>
      </div>
    );
  }
}