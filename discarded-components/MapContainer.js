import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
 
export class MapContainer extends Component {
    
    render() {
        const style = {
            width: '100%',
            height: '100%'
        }
        return (
            <Map
                google={this.props.google}
                style={style}
                initialCenter={
                    {
                        lat: 40.854885,
                        lng: -88.081807
                    }
                }
                zoom={15}
            >
            </Map>
        );
    }
}
 
export default GoogleApiWrapper({
  apiKey: ('googlekey')
})(MapContainer)