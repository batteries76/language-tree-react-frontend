import { Component } from "react";
var GoogleMapsLoader = require('google-maps');

// < 1%: PAPAYAWHIP
// 1-2%: KHAKI
// 2-5%: YELLOW
// 5-10%: ORANGE
// 10-20%: DARKORANGE
// 20-40%: ORANGERED
// 40-60%: RED
// 60-80%: FIREBRICK
// 80-100%: DARKRED
// No percentage data: LIGHTSTEELBLUE

const colours = {
    lessThanOne: 'PAPAYAWHIP',
    oneToTwo: 'KHAKI',
    twoToFive: 'GOLDENROD',
    fiveToTen: 'ORANGE',
    tenToTwenty: 'DARKORANGE',
    twentyToForty: 'ORANGERED',
    fortyToSixty: 'RED',
    sixtyToEighty: 'FIREBRICK',
    eightyToOneHundred: 'DARKRED',
    noData: 'LIGHTSTEELBLUE'
}

// Data structure
// "name": "Marathi",
//     "level id": 101,
//     "alive": "x",
//     "children": [],
//     "iso6393": "xxx",
//     "countriesPercentagesCodesAndGeo": [
//         {
//             "countryName": "India",
//             "languages": {
//                 "name": "Marathi",
//                 "percent": 6.9
//             },
//             "countryCode": "in",
//             "geoData": [

class GoogleApiPolygonWithJS extends Component {

    colourSwitch = (percentage) => {
        if (percentage > 0 && percentage <= 1) {
            return colours.lessThanOne
        }
        else if (percentage >= 1 && percentage < 2) {
            return colours.oneToTwo
        }
        else if (percentage >= 2 && percentage < 5) {
            return colours.twoToFive
        }
        else if (percentage >= 5 && percentage < 10) {
            return colours.fiveToTen
        }
        else if (percentage >= 10 && percentage < 20) {
            return colours.tenToTwenty
        }
        else if (percentage >= 20 && percentage < 40) {
            return colours.twentyToForty
        }
        else if (percentage >= 40 && percentage < 60) {
            return colours.fortyToSixty
        }
        else if (percentage >= 60 && percentage < 80) {
            return colours.sixtyToEighty
        }
        else if (percentage >= 80 && percentage <= 100) {
            return colours.eightyToOneHundred
        }
        else {
            return colours.noData
        }
    }

    render() {

        // console.log("NEW ACCUMULATED GEO")
        // console.log(this.props)

        GoogleMapsLoader.KEY = '';
        GoogleMapsLoader.load((google) => {

            // console.log("I'M HERE ZZZZZZZZZZZZ")
            // console.log(this.props.countriesData)

            if (this.props.languageFamiliesShowing && !this.props.searchSuccess) {
                var map = new google.maps.Map(document.getElementById('js-map'), {
                    mapTypeId: 'hybrid',
                    center: {
                        lat: 0,
                        lng: 0
                    },
                    zoom: 1
                });
    
                return map
            }
    
            if (this.props.countriesData.alive === 'f') {

                let map;

                if (this.props.accumulatedGeo) {
                    if (this.props.accumulatedGeo.geo) {

                        // console.log("IN THE FAMILY SECTION")
                        // console.log(this.props.accumulatedGeo.geo)

                        let flag = true
                        let counter = 0

                        while (counter < this.props.accumulatedGeo.geo.length && flag) {
                            // console.log("MAKE MAP!!")
                            // console.log(this.props.accumulatedGeo.geo[counter].geoData)
                            if (this.props.accumulatedGeo.geo[counter].geoData) {
                                if (isNaN(this.props.accumulatedGeo.geo[counter].geoData[0].lat)) {

                                    if (this.props.accumulatedGeo.geo[counter].geoData.lat) {
                                        // console.log("TRUE PATH")
                                        map = new google.maps.Map(document.getElementById('js-map'), {
                                                zoom: 2,
                                                center: this.props.accumulatedGeo.geo[counter].geodata[0],
                                                mapTypeId: 'hybrid'
                                        });
                                        // console.log("MAP MADE!") 
                                        flag = false
                                    }
                                    else {
                                        // console.log("FALSE PATH")
                                        // console.log(this.props.accumulatedGeo.geo[counter].geoData[0])
                                        map = new google.maps.Map(document.querySelector('#js-map'), {
                                                zoom: 2,
                                                center: this.props.accumulatedGeo.geo[counter].geoData[0][0],
                                                mapTypeId: 'hybrid'
                                        });
                                        // console.log("MAP MADE!") 
                                        flag = false
                                    }  
                                }
                            }
                            counter += 1
                        }

                        
                        this.props.accumulatedGeo.geo.forEach(countryData => {
                            // console.log("COUNTRY DATA")
                            // console.log(countryData)
    
                            if (countryData.geoData) {
    
                                // console.log("POLYGON CREATION")
                                // console.log(countryData.countryName)
                                // console.log(countryData.geoData)
                                var countryPolygon = new google.maps.Polygon({
                                    paths: countryData.geoData,
                                    strokeColor: 'powderblue',
                                    strokeOpacity: 0.8,
                                    strokeWeight: 1,
                                    fillColor: 'powderblue',
                                    fillOpacity: 0.7
                                });
                                countryPolygon.setMap(map);
                            }
                            
                        })
                        // console.log("MAP RETURN")
                        // console.log(this.props.countriesData.name)
                        return map
                    }
                }
                else {
                    new google.maps.Map(document.getElementById('js-map'), {
                            mapTypeId: 'hybrid',
                            center: {
                                lat: 0,
                                lng: 0
                            },
                            zoom: 1
                    });

                    return map
                }
            }
            else {

                // console.log("IN THE ALIVE AND DEAD SECTION")
                // console.log(this.props)

                if (this.props.percentagesGeo) {
                
                    // console.log("GEO PERCENTAGE IN")

                    if (this.props.percentagesGeo.countriesPercentagesCodesAndGeo) {

                        // console.log("GEO PERCENTAGE IN AND LENGTH > 0")
                        let map;
                        let counter = 0
                        let flag = true
                        
                        while (counter < this.props.percentagesGeo.countriesPercentagesCodesAndGeo.length && flag) {
                            if (this.props.percentagesGeo.countriesPercentagesCodesAndGeo[0].geoData) {
                                if (this.props.percentagesGeo.countriesPercentagesCodesAndGeo[0].geoData[0].lat) {
                                    map = new google.maps.Map(document.getElementById('js-map'), {
                                        zoom: 2,
                                        center: this.props.percentagesGeo.countriesPercentagesCodesAndGeo[0].geoData[0],
                                        mapTypeId: 'hybrid'
                                    });
                                    flag = false
                                }
                                else {
                                    map = new google.maps.Map(document.getElementById('js-map'), {
                                        zoom: 2,
                                        center: this.props.percentagesGeo.countriesPercentagesCodesAndGeo[0].geoData[0][0],
                                        mapTypeId: 'hybrid'
                                    });
                                    flag = false
                                }
                            }
                            counter += 1
                        }

                        this.props.percentagesGeo.countriesPercentagesCodesAndGeo.forEach(countryData => {

                            if (this.props.percentagesGeo.countriesPercentagesCodesAndGeo[0].geoData) {
                                var countryPolygon = new google.maps.Polygon({
                                    paths: countryData.geoData,
                                    strokeColor: this.colourSwitch(countryData.languages.percent),
                                    strokeOpacity: 0.8,
                                    strokeWeight: 1,
                                    fillColor: this.colourSwitch(countryData.languages.percent),
                                    fillOpacity: 0.7
                                });
    
                                countryPolygon.setMap(map);
                            }

                        })

                        return map
                    }
                }
                else {
                    // console.log("ELSE CLAUSE")
                    map = new google.maps.Map(document.getElementById('js-map'), {
                                        mapTypeId: 'hybrid',
                                        center: {
                                            lat: 0,
                                            lng: 0
                                        },
                                        zoom: 1
                    });

                    return map
                }
            }
        })   
        return "WHAT?"     
    }
}

export default GoogleApiPolygonWithJS;