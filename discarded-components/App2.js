import React, { Component } from 'react';
import axios from 'axios';

import TreeArea from './components/TreeArea';
import MapArea from './components/MapArea';

import './styles/App.css';

const url = 'http://localhost:3900/api'

class App extends Component {

    state = {
        currentHead: languageTree,
        languageHeadHistory: [languageTree],
        countryData: null,
        mapCentreAsCapital: null,
        geoData: null,
        processedGeoData: null,
        currentCountries: null,
        languageCodeData: languageCodeData,
        currentCountriesGeo: null,
        accumulatedGeo: []
    }

    getData = () => {
        // Make a request for a user with a given ID
        // axios.get(url + '/language-json')
        //     .then((response) => {
        //         // handle success
        //         console.log("AXIOS SUCCESS LAGUAGE JSON")
        //         console.log(response);

        //         this.setState({
        //             currentHead: response.data[0],
        //             languageHeadHistory: [response.data[0]]
        //         })
        //     })
        //     .catch((error) => {
        //         // handle error
        //         console.log(error);
        //     })

        axios.get(url + '/country-info')
            .then((response) => {
                // handle success
                console.log("AXIOS SUCCESS COUNTRY INFO")
                console.log(response);

                this.setState({
                    countryData: response.data
                })
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
        
    }

    componentDidMount(){
        this.getData();
    }

    goBackUp = () => {
        console.log("GO BACK UP")
        this.setState(prevState => {
            console.log("LANGUAGEHEADHISTORY")
            console.log(prevState.languageHeadHistory)
            let historyCopy = prevState.languageHeadHistory.filter(head => {
                return true
            })
            historyCopy.pop()
            console.log("HISTORY COPY SLICE")
            console.log(historyCopy.slice(-1)[0])
            return {
                    currentHead: historyCopy.slice(-1)[0],
                    languageHeadHistory: historyCopy
                }
        })
    }

    goDownOneLevel = (newHead) => {
        console.log("GO DOWN ONE LEVEL")
        console.log("NEWHEAD")
        console.log(newHead)
        // let languageCodeArray = this.findLanguageCode(newHead.name)
        // console.log("LANGUAGE CODE")
        // console.log(languageCodeArray)
        let countryList = this.findCiaLanguages(newHead.name)
        console.log("COUNTRY LIST AFTER CIA CALL")
        console.log(countryList)
        let countryCodeList = this.
        console.log("COUNTRY CODE LIST")
        console.log(countryCodeList)
        console.log("LANGUAGEHEADHISTORY going in to setstate")
        console.log(this.state.languageHeadHistory)
        // ***********************************
        if (countryCodeList.length > 0) {
            let countryQueryString = this.prepQueryString(countryCodeList)
            console.log("QUERY STRING")
            console.log(countryQueryString)
            this.getGeoData(countryQueryString)
        }
        this.setState(prevState => {
            console.log("SET STATE GOING DOWN")
            return {
                currentHead: newHead,
                languageHeadHistory: prevState.languageHeadHistory.concat(newHead)
                // languageHeadHistory: [...prevState.languageHeadHistory, newHead]
            }
            // () => {
            //     console.log("LANGUAGEHEADHISTORY")
            //     console.log(this.state.languageHeadHistory)
            // }
        })
    }

    prepQueryString = (codesArray) => {
        console.log("Made it in here")
        let queryString = '?'
        codesArray.forEach((code, index) => {
            console.log("GOT IN THE LOOP")
            queryString = queryString.concat(`code${index+1}=${code.toLowerCase()}`)
            // queryString.concat(`ZZZZZZA`)
            if (index < codesArray.length-1) {
                queryString = queryString.concat('&')
            }
        })
        return queryString
    }

    findCiaLanguages = async (language) => {
        let response = await axios.get(url + '/cia-data' + `?language=${language}`)
        this.setState({
                    currentCountries: response.data
                })
        return response.data
    }

    getCountryCodes = (countriesArray) => {
        let codeArray = []
        countriesArray.forEach(languagesCountry => {
            this.state.countryData.forEach(country => {
                if (languagesCountry.countryName === country.name.common){
                    codeArray.push(country.cca2)
                }
            })
        })
        return codeArray
    }

    findLanguageCode = (languageName) => {
        let languageCodeArray = []
        this.state.languageCodeData.forEach(dataElement => {
            if (dataElement['English'] === languageName){
                if (dataElement["alpha3-b"]){
                    languageCodeArray.push(dataElement["alpha3-b"])
                }
                if (dataElement["alpha3-t"]){
                    languageCodeArray.push(dataElement["alpha3-t"])
                }
            }
        })
        return languageCodeArray
    }

    findCountriesThatSpeakTheLanguage = (languageCodes) => {
        let countryCodesForLanguage = []
        if (this.state.countryData) {
            this.state.countryData.forEach(country => {
                languageCodes.forEach(languageCode => {
                    if (country.languages[languageCode]) {
                        countryCodesForLanguage.push(country.cca2)
                        let capitalCoords = {
                            lat: country.latlng[0],
                            lng: country.latlng[1]
                        }
                        console.log("CAPITAL COORDS")
                        console.log(capitalCoords)
                        this.setState({
                            mapCentreAsCapital: capitalCoords
                        })
                    }
                })
            })
        }
        return countryCodesForLanguage
    }

    getGeoData = async (countryCodeQuery) => {
        let response = await axios.get(url + '/country-geo' + countryCodeQuery)
        this.setState({
                    geoData: response.data
                })
        let processedData = this.processCoordinates(response.data)
        console.log("PROCESSED DATA")
        console.log(processedData)
        this.setState({
            processedGeoData: processedData
        })
    }

    processCoordinates = (geoDataArray) => {
        let processedData = []
        console.log("GEODATA ARRAY")
        console.log(geoDataArray)
        geoDataArray.forEach(geodataForOneCountry => {
            // console.log(geodataForOneCountry.features[0].geometry.coordinates)
            geodataForOneCountry.features[0].geometry.coordinates.forEach(coordArray => {
                console.log("COORDARRAY")
                console.log(coordArray)
                console.log("coordArray[0][0]")
                console.log(coordArray[0][0])
                console.log("IF !isNaN(coordArray[0][0])")
                console.log(!isNaN(coordArray[0][0]))
                if (isNaN(coordArray[0][0])) {
                    console.log("TRUE PATH")
                    coordArray.forEach(coordArrayBatch => {
                        // console.log("COORDARRAY BATCH")
                        // console.log(coordArrayBatch)
                        coordArrayBatch.forEach(coordArray => {
                            let coordObject = {
                                lat: coordArray[1],
                                lng: coordArray[0]
                            }
                            processedData.push(coordObject)
                        })
                    })
                }
                else {
                    console.log("FALSE PATH")
                    coordArray.forEach(coordCouple => {
                        let coordObject = {
                            lat: coordCouple[1],
                            lng: coordCouple[0]
                        }
                        processedData.push(coordObject)
                    })
                }
            })
        })
        return processedData
    }

    render() {
        // console.log("RENDER, STATE: LANGUAGEHEAD")
        // console.log(this.state.languageHeadHistory)
        if (this.state.currentHead) {
            return (
                <div className="app">
                    <h1> Language Tree </h1>
                    <div className="tree-and-map-wrapper"> 
                        <TreeArea className="tree-area" 
                            currentHead={ this.state.currentHead }    
                            upClicky={ this.goBackUp }
                            downClicky={ this.goDownOneLevel }
                            languageHistory={ this.state.languageHeadHistory }
                        />
                        <MapArea   
                            className="map-area" 
                            mapCentreAsCapital={this.state.mapCentreAsCapital}
                            processedGeoData={this.state.processedGeoData}
                        />
                    </div>
                </div>
            );
        }
        else {
            return <h1> THE DATA IS LOADING.. </h1>
        }

    }
}

export default App;