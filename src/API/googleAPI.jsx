import React, { PropTypes, Component } from 'react';
import AlumniStore from '../store/AlumniStore.jsx';
import ActionCreator from '../ActionCreator/firebase.jsx'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import "../components/components.css" 

const mapStyles = {
    width: '100%',
    height: '545px',
    'marginLeft': 'auto',
    'marginRight': 'auto',
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: {},
            submit: {}
        };
    }

    renderMarkers() {
        var markerArray = [];
        var keys = Object.keys(this.props.markers);
        var values = Object.values(this.props.markers);

        for (var i = 0; i < keys.length; i++) {
            markerArray.push(this.renderMarker(keys[i], values[i].lat, values[i].lng));
        }

        return (markerArray);
    }

    onMarkerClick = (props, marker) => 
        this.props.handleClick(marker.name)

    renderMarker(zipCode, latitude, longitude) {
        return(
            <Marker
                name={zipCode}
                position={{ lat: latitude, lng: longitude }}
                onClick={this.onMarkerClick}
                title={"View Alumni Working at zipcode " + zipCode + "."} 
            />
        );  
    }

    render() {
        return (
            <div id = "map-container">
                <Map
                    google={this.props.google}
                    zoom={7}
                    style={mapStyles}
                    initialCenter={{
                        lat: 37.948544,
                        lng: -91.7715303
                    }}
                    options={{streetViewControl: false}}
                    gestureHandling='cooperative'
                >
                        { this.renderMarkers() }
                </Map>
            </div>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB8C4oxxXZLkS11uPga8JIiXL5JRA9gXS4'
}) (MapContainer);