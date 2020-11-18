import React from "react";
import GoogleMapReact from "google-map-react";
// var GoogleMapsLoader = require('google-maps');

const GoogleApiPolygon = (props) => {

    // console.log("GOOGLE MAP REACT")
    // console.log(GoogleMapReact)
    // console.log("GOOGLE MAPS LOADER")
    // console.log(GoogleMapsLoader)

    const onGoogleApiLoaded = (map, maps) => {

        console.log("I'M HERE XXXX")
        console.log(props.processedGeoData)
        if (props.processedGeoData) {
            var polygonCoords = props.processedGeoData
        }
        else {
            var polygonCoords = [
                { lat: 25.774, lng: -80.19 },
                { lat: 18.466, lng: -66.118 },
                { lat: 32.321, lng: -64.757 },
                { lat: 25.774, lng: -80.19 }
            ];
        }
      
        // Construct the polygon.
        var countryPolygon = new maps.Polygon({
            paths: polygonCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35
        });
        countryPolygon.setMap(map);
    };

    const newMapLoading = (google) => {

        console.log("I'M HERE ZZZZZZZZZZZZ")
        console.log(props.processedGeoData)

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: props.mapCentreAsCapital,
            mapTypeId: 'terrain'
        });

        var polygonCoords = props.processedGeoData
        // Construct the polygon.
        var countryPolygon = new google.maps.Polygon({
            paths: polygonCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35
        });
        countryPolygon.setMap(map);
    };

    let defaultProps = {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 1
    };

    if (props.processedGeoData) {
        console.log("MAPPPPP")
        // console.log(GoogleMapsLoader.load())
        // GoogleMapsLoader.load((google) => {
        //     var map = new google.maps.Map(document.getElementById('map'), {
        //                 zoom: 10,
        //                 center: props.mapCentreAsCapital,
        //                 mapTypeId: 'terrain'
        //             });

        //     var polygonCoords = props.processedGeoData
        //     // Construct the polygon.
        //     var countryPolygon = new google.maps.Polygon({
        //         paths: polygonCoords,
        //         strokeColor: "#FF0000",
        //         strokeOpacity: 0.8,
        //         strokeWeight: 2,
        //         fillColor: "#FF0000",
        //         fillOpacity: 0.35
        //     });
        //     countryPolygon.setMap(map);
        // })
        
        // GoogleMapsLoader.load((google) => {
        //     var map = new google.maps.Map(document.getElementById('map'), {
        //         zoom: 10,
        //         center: props.mapCentreAsCapital,
        //         mapTypeId: 'terrain'
        //     });

        //     var newCountry = new google.maps.Polygon({
        //         paths: props.processedGeoData,
        //         strokeColor: '#FF0000',
        //         strokeOpacity: 0.8,
        //         strokeWeight: 2,
        //         fillColor: '#FF0000',
        //         fillOpacity: 0.35
        //     });
        //     newCountry.setMap(map);
        // });

        return (
            <GoogleMapReact
                polygon={props.processedGeoData}
                bootstrapURLKeys={{ key: 'googlekey' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                center={props.mapCentreAsCapital}
                zoom={10}
                yesIWantToUseGoogleMapApiInternals
                googleMapLoader={(google) => newMapLoading(google)}
            />
        );
    }
    else {
        console.log("NONONONONONO MAP")
        console.log(props.processedGeoData)
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'googlekey' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
            />
        );
    }
}

export default GoogleApiPolygon;