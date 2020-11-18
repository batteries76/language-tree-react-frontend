import React, { Component } from 'react';
import axios from 'axios';

import TreeArea from './components/TreeArea';
import MapArea from './components/MapArea';
import LanguageStatusKeyAndSearch from './components/LanguageStatusKeyAndSearch'
import LanguagePercentageKey from './components/LanguagePercentageKey'
import DetailsComponent from './components/DetailsComponent'
import TreeAreaThreeLevels from './components/TreeAreaThreeLevels';
import LanguageFamilies from './components/LanguageFamilies'

import './styles/App.css';
import InfoMapsThanks from './components/InfoMapsThanks';

import InfoModal from './components/InfoModal'
import ThanksModal from './components/ThanksModal'
import TreeImageModal from './components/TreeImageModal'
import SearchResultsArea from './components/SearchResultsArea'

import boreanImage from './images/Borean-Language-Tree.png'
import deneCaucasainImage from './images/Dene-Caucasian-Tree.png'
import indoEuropeanImage from './images/Indo-European-Tree.png'
import WikiModal from './components/WikiModal';

const CancelToken = axios.CancelToken;
let cancel;

// const url = 'http://localhost:3900/api'
const url = 'https://still-island-98218.herokuapp.com/api'

class App extends Component {

    allLanguagesList = []
    languageSearchValue = ''

    state = {
        currentHead: null,
        languageHeadHistory: null,
        twoLevels: true,
        accumulatedGeo: null,
        percentagesGeo: null,
        thanksModalShowing: false,
        infoModalShowing: false,
        treeImageShowing: false,
        allLanguagesListState: [],
        allTreeNames: [],
        languageFamiliesShowing: true,
        languageFamiliesList: ["Indo-European", "Sino-Caucasian"],
        indoEuropeanTree: null,
        sinoCaucasianTree: null,
        currentLanguageTree: null,
        searchLanguagesSublist: [],
        searchOpen: false,
        searchResult: null,
        searchValue: '',
        searchSuccess: false,
        treeImage: boreanImage,
        wikiOpen: false,
        wikiContent: null
    }

    getData = () => {
        console.log("URL")
        console.log(url)
        Promise.all(
            [
                axios.get(url + '/indo-european-language-tree', {
                    cancelToken: new CancelToken(function executor(c) { cancel = c; })
                }),
                axios.get(url + '/sino-caucasian-language-tree', {
                    cancelToken: new CancelToken(function executor(c) { cancel = c; })
                })
            ]
          ).then(([response1, response2]) => {
                this.setState({
                    indoEuropeanTree: response1.data[0],
                    sinoCaucasianTree: response2.data[0]
                }, () => {
                    console.log("IN THE GET DATA INDO-EURO")
                    console.log(this.state.indoEuropeanTree)
                    this.getAllLanguages(this.state.indoEuropeanTree, this.allLanguagesList)
                    console.log(this.allLanguagesList)
                    this.getAllLanguages(this.state.sinoCaucasianTree, this.allLanguagesList)
                    console.log("ALL LANGAUGES LIST")
                    console.log(this.allLanguagesList)
                    console.log("ALL LANGAUGES LIST LENGTH")
                    console.log(this.allLanguagesList.length)
                })
          })
    }

    componentDidMount(){
        this.getData();
    }

    goBackUp = () => {

        cancel();

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
                    languageHeadHistory: historyCopy,
                    accumulatedGeo: null,
                    percentagesGeo: null
                }
        }, () => {
            console.log("CALLBACK AFTER SETSTATE")
            if (this.state.currentHead.alive === 'f') {

                axios.get(url + `/accumulated-geo?language=${this.state.currentHead.name}&collection=${this.state.currentHead.family}`, {
                    // cancelToken: upTreeAccumulated.token
                    // cancelToken: source.token
                    cancelToken: new CancelToken(function executor(c) {
                        // An executor function receives a cancel function as a parameter
                        cancel = c;
                    })
                })
                .then((response) => {
                    
                    console.log("AXIOS SUCCESS LAGUAGE JSON")
                    console.log(response);

                    let data = []
                    if (response.data[0]) {
                        console.log("ACCUMULATED DATA SWITCH")
                        data = response.data[0]
                    }
                    
                    this.setState({
                        accumulatedGeo: data,
                    })
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message);
                    }
                    // handle error
                    console.log(error);
                })
            }
            else {

                axios.get(url + `/percentages-geodata?language=${this.state.currentHead.name}&collection=${this.state.currentHead.family}`, {
                    // cancelToken: upTreePercent.token
                    // cancelToken: source.token
                    cancelToken: new CancelToken(function executor(c) {
                        // An executor function receives a cancel function as a parameter
                        cancel = c;
                    })
                })
                .then((response) => {
                    
                    console.log("AXIOS PERCENTAGES GEO")
                    console.log(response.data[0]);

                    let data = []
                    if (response.data[0]) {
                        console.log("Percentage DATA SWITCH")
                        data = response.data[0]
                    }
                
                    this.setState({
                        percentagesGeo: data,
                    })
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message);
                    }
                    // handle error
                    console.log(error);
                })
            }
        })
    }

    goDownOneLevel = (newHead) => {

        cancel()

        console.log("GO DOWN ONE LEVEL &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log("NEWHEAD")
        console.log(newHead)

        this.setState(prevState => {
            console.log("SET STATE GOING DOWN")
            return {
                currentHead: newHead,
                languageHeadHistory: prevState.languageHeadHistory.concat(newHead),
                accumulatedGeo: null,
                percentagesGeo: null
            }
        }, () => {
            console.log("SET STATE CALLBACK AFTER GOING DOWN ONE LEVEL")
            if (newHead.alive === 'f') {
                axios.get(url + `/accumulated-geo?language=${newHead.name}&collection=${newHead.family}`, {
                        // cancelToken: downTreeAccumulated.token
                        // cancelToken: source.token
                        cancelToken: new CancelToken(function executor(c) {
                            // An executor function receives a cancel function as a parameter
                            cancel = c;
                        })
                    })
                    .then((response) => {
    
                        console.log("AXIOS ACCUMULATED GEO")
                        console.log(response);

                        let data = []
                        if (response.data[0]) {
                            console.log("ACCUMULATED DATA SWITCH")
                            data = response.data[0]
                        }
    
                        this.setState({
                            accumulatedGeo: data,
                        })
                    })
                    .catch((error) => {
                        if (axios.isCancel(error)) {
                            console.log('Request canceled', error.message);
                        }
                        // handle error
                        console.log(error);
                    })
            }
            else {
                axios.get(url + `/percentages-geodata?language=${newHead.name}&collection=${newHead.family}`, {
                        // cancelToken: downTreePercent.token
                        // cancelToken: source.token
                        cancelToken: new CancelToken(function executor(c) {
                            // An executor function receives a cancel function as a parameter
                            cancel = c;
                        })
                    })
                    .then((response) => {
    
                        console.log("AXIOS PERCENTAGES GEO")
                        console.log(response.data[0]);

                        let data = []
                        if (response.data[0]) {
                            console.log("DATA SWITCH")
                            data = response.data[0]
                        }

                        this.setState({
                            percentagesGeo: data,
                        })
                    })
                    .catch((error) => {
                        if (axios.isCancel(error)) {
                            console.log('Request canceled', error.message);
                        }
                        // handle error
                        console.log(error);
                    })
            }
        })
    }

    switchTreeView = () => {
        console.log("SWITCH TREE VIEW")
        this.setState(prevState => {
            return {
                twoLevels: !prevState.twoLevels
            }
        })
    }

    clickInfo = () => {
        console.log("INFO CLICKED")
        this.setState({
            infoModalShowing: true,
            thanksModalShowing: false,
            treeImageShowing: false
        })
    }

    clickThanks = () => {
        console.log("THANKS CLICKED")
        this.setState({
            infoModalShowing: false,
            thanksModalShowing: true,
            treeImageShowing: false
        })
    }

    clickMap = () => {
        console.log("MAP CLICKED")
        this.setState({
            infoModalShowing: false,
            thanksModalShowing: false,
            treeImageShowing: true
        })
    }

    shutModals = () => {
        console.log("SHUT THE MODALS")
        this.setState({
            infoModalShowing: false,
            thanksModalShowing: false,
            treeImageShowing: false,
            wikiOpen: false
        })
    }

    chooseLanguageFamily = (languageFamily) => {
        this.setState({
            accumulatedGeo: null
        })
        if (languageFamily === 'Indo-European') {
            this.getAccumulatedGeo(languageFamily, 'Indo-European')
            this.setState({
                treeImage: indoEuropeanImage,
                currentLanguageFamily: 'Indo-European'
            })
        }
        else {
            this.getAccumulatedGeo(languageFamily, 'Sino-Caucasian')
            this.setState({
                treeImage: deneCaucasainImage,
                currentLanguageFamily: 'Sino-Caucasian'
            })
        }
        this.setState({
            currentLanguageFamily: languageFamily,
            currentHead: this.loadCurrentHead(languageFamily),
            languageHeadHistory: [this.loadCurrentHead(languageFamily)],
            languageFamiliesShowing: false,
        })
    }

    loadCurrentHead = (languageFamily) => {
        if (languageFamily === 'Indo-European') {
            console.log("CHANGING TO INDO-EURO")
            console.log(this.state.indoEuropeanTree)
            return this.state.indoEuropeanTree
        }
        else if (languageFamily === 'Sino-Caucasian') {
            console.log("CHANGING TO SINO-CAUC")
            return this.state.sinoCaucasianTree
        }
        else {
            console.log("SOMETHING ELSE HAPPENED")
            return null
        }
    }

    backToFamiliesView = () => {
        this.setState({
            languageFamiliesShowing: true,
            languageSearchValue: '',
            treeImage: boreanImage
        })
    }

    backToFamiliesViewFromSearch = () => {
        this.setState({
            languageFamiliesShowing: true,
            languageSearchValue: '',
            searchOpen: false,
            searchSuccess: false
        })
    }

    getAllLanguages = (node, array) => {
        array.push(node.name)
        node.children.forEach((child) => {
            this.getAllLanguages(child, array)
        })
    }

    handleSearchChange = (event) => {
        console.log("HANDLE SEARCH CHANGE TRIGGERED")
        console.log(event.target.value)
        console.log("EVENT KEY")
        console.log(event)
        this.setState({
            searchValue: event.target.value
        })
        this.returnSubsetList(event.target.value)
        // this.languageSearchValue = event.target.value
        // this.returnSubsetList(this.searchResult)
        // if (/[a-zA-Z0-9-_ ]/.test(event.key)) {
        //     console.log("VALID KEY")
        //     this.languageSearchValue += event.key
        //     this.returnSubsetList(this.languageSearchValue)
        // }
        // else {
        //     console.log("INVALID KEY")
        // }
    }

    handleSearchSubmit = (event) => {
        console.log("HANDLE SEARCH SUMBIT TRIGGERED")
        console.log('A search was submitted: ' + this.state.searchValue)
        event.preventDefault();
        document.getElementById("language-search").reset();
        const languageValue = this.state.searchValue.toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join('-')
            .trim();
        Promise.all(
            [
                axios.get(url + `/indo-european-paths?language=${languageValue}`, {
                    cancelToken: new CancelToken(function executor(c) { cancel = c; })
                }),
                axios.get(url + `/sino-caucasian-paths?language=${languageValue}`, {
                    cancelToken: new CancelToken(function executor(c) { cancel = c; })
                })
            ]
            ).then(([response1, response2]) => {
                console.log("IN THE PROMISE ALL")
                console.log('response1: ', response1)
                console.log('response2: ', response2)
                if (response1.data.length > 0) {
                    this.setState({
                        searchResult: response1.data[0],
                        searchOpen: true,
                        searchValue: '',
                        currentHead: response1.data[0],
                        languageHeadHistory: response1.data[0].paths,
                        searchSuccess: true,
                        searchLanguagesSublist: []
                    }, () => {
                        console.log("Found in indo-euro")
                        if (this.state.currentHead.alive === 'f') {
                            this.getAccumulatedGeo(this.state.currentHead.name, 'Indo-European')
                        }
                        else {
                            this.getPercentageGeo(this.state.currentHead.name, 'Indo-European')
                        }
                    })
                }
                else if (response2.data.length > 0) {
                    this.setState({
                        searchResult: response2.data[0],
                        searchOpen: true,
                        searchValue: '',
                        currentHead: response2.data[0],
                        languageHeadHistory: response2.data[0].paths,
                        searchSuccess: true,
                        searchLanguagesSublist: []
                    }, () => {
                        console.log("Found in sino-cauc")
                        if (this.state.currentHead.alive === 'f') {
                            this.getAccumulatedGeo(this.state.currentHead.name, 'Sino-Caucasian')
                        }
                        else {
                            this.getPercentageGeo(this.state.currentHead.name, 'Sino-Caucasian')
                        }
                    })
                } 
                else {
                    this.setState({
                        searchValue: '',
                        searchOpen: true,
                        searchResult: null,
                        searchLanguagesSublist: []
                    }, () => {
                        console.log("NOT FOUND")
                    })
                }
            })
    }

    handleClickSubmit = (language) => {
        console.log("HANDLE CLICK SUMBIT TRIGGERED")
        console.log(language)
        document.getElementById("language-search").reset();
        Promise.all(
            [
                axios.get(url + `/indo-european-paths?language=${language}`, {
                    cancelToken: new CancelToken(function executor(c) { cancel = c; })
                }),
                axios.get(url + `/sino-caucasian-paths?language=${language}`, {
                    cancelToken: new CancelToken(function executor(c) { cancel = c; })
                })
            ]
            ).then(([response1, response2]) => {
                console.log("IN THE PROMISE ALL")
                console.log('response1: ', response1)
                console.log('response2: ', response2)
                if (response1.data.length > 0) {
                    this.setState({
                        searchResult: response1.data[0],
                        searchOpen: true,
                        searchValue: '',
                        currentHead: response1.data[0],
                        languageHeadHistory: response1.data[0].paths,
                        searchSuccess: true,
                        searchLanguagesSublist: []
                    }, () => {
                        console.log("Found in indo-euro")
                        if (this.state.currentHead.alive === 'f') {
                            this.getAccumulatedGeo(this.state.currentHead.name, 'Indo-European')
                        }
                        else {
                            this.getPercentageGeo(this.state.currentHead.name, 'Indo-European')
                        }
                    })
                }
                else if (response2.data.length > 0) {
                    this.setState({
                        searchResult: response2.data[0],
                        searchOpen: true,
                        searchValue: '',
                        currentHead: response2.data[0],
                        languageHeadHistory: response2.data[0].paths,
                        searchSuccess: true,
                        searchLanguagesSublist: []
                    }, () => {
                        console.log("Found in sino-cauc")
                        if (this.state.currentHead.alive === 'f') {
                            this.getAccumulatedGeo(this.state.currentHead.name, 'Sino-Caucasian')
                        }
                        else {
                            this.getPercentageGeo(this.state.currentHead.name, 'Sino-Caucasian')
                        }
                    })
                } 
                else {
                    this.setState({
                        searchValue: '',
                        searchOpen: true,
                        searchResult: null,
                        searchLanguagesSublist: []
                    }, () => {
                        console.log("NOT FOUND")
                    })
                }
            })
    }

    returnSubsetList = (value) => {
        console.log("RETURN SUBSETLIST")
        console.log(value)
        const regexSafeString = value.replace(/[^A-Za-z0-9-]/g, '');
        this.setState({
            searchLanguagesSublist: this.allLanguagesList.filter(languageName => {
                // console.log(languageName)
                return languageName.toLowerCase().match(new RegExp(regexSafeString.toLowerCase()))
            })
        }, () => {
            console.log("SEARCH VALUE")
            console.log(value)
            console.log("REGEXSAFE STRING")
            const regexSafeString = value.replace(/[^A-Za-z0-9-]/g, '');
            console.log(new RegExp(regexSafeString))
            console.log("SUBLIST")
            console.log(this.state.searchLanguagesSublist)
        })
    }

    getAccumulatedGeo = (languageName, collection) => {
        axios.get(url + `/accumulated-geo?language=${languageName}&collection=${collection}`, {
            // cancelToken: downTreeAccumulated.token
            // cancelToken: source.token
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            })
        })
        .then((response) => {

            console.log("AXIOS ACCUMULATED GEO")
            console.log(response);

            let data = []
            if (response.data[0]) {
                console.log("ACCUMULATED DATA SWITCH")
                data = response.data[0]
            }

            this.setState({
                accumulatedGeo: data,
            })
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            }
            // handle error
            console.log(error);
        })
    }

    getPercentageGeo = (languageName, collection) => {
        axios.get(url + `/percentages-geodata?language=${languageName}&collection=${collection}`, {
            // cancelToken: downTreePercent.token
            // cancelToken: source.token
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            })
        })
        .then((response) => {

            console.log("AXIOS PERCENTAGES GEO")
            console.log(response.data[0]);

            let data = []
            if (response.data[0]) {
                console.log("DATA SWITCH")
                data = response.data[0]
            }

            this.setState({
                percentagesGeo: data,
            })
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            }
            // handle error
            console.log(error);
        })
    }

    clickOnSearchPath = (path) => {
        console.log("CLICKED SEARCH PATH **************************")
        console.log(path)
        const newCurrentHead = path[path.length-1]
        console.log("NEW CURRENTHEAD")
        console.log(newCurrentHead)
        const newHistory = path
        this.setState({
            currentHead: newCurrentHead,
            languageHeadHistory: newHistory,
            searchOpen: false,
            languageFamiliesShowing: false
        }, () => {
            console.log("CLICK ON SEARCH PATH SETSTATE CALLBACK")
            if (this.state.currentHead.alive === 'f') {
                this.getAccumulatedGeo(this.state.currentHead.name, this.state.currentHead.family)
            }
            else {
                this.getPercentageGeo(this.state.currentHead.name, this.state.currentHead.family)
            }
        })
    }

    openWiki = (language) => {
        this.setState({
            wikiOpen: true
        })
        axios.get(url + `/language-wiki/${language}`)
        // axios.get(`http://localhost:4567/wiki-language/${language}`)
            .then(response => {
                console.log("WIKI RESPONSE")
                console.log(response)
                this.setState({
                    wikiContent: response
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    // 🌿

    render() {
        // console.log("RENDER, STATE: ACCUMULATED")
        // console.log(this.state.currentHead)
        if (this.state.sinoCaucasianTree && this.state.indoEuropeanTree) {
        // if (this.state.currentHead) {
            return (
                <div className="app">
                    <InfoMapsThanks
                        clickInfo={this.clickInfo}
                        clickThanks={this.clickThanks}
                        clickMap={this.clickMap}
                        currentFamily={ this.state.currentLanguageFamily }
                    />
                    <InfoModal show={ this.state.infoModalShowing } hide={ this.shutModals } />
                    <ThanksModal show={ this.state.thanksModalShowing } hide={ this.shutModals } />
                    <TreeImageModal show={ this.state.treeImageShowing } hide={ this.shutModals } treeImage={ this.state.treeImage } />
                    <WikiModal show={ this.state.wikiOpen } hide={ this.shutModals } wikiContent={ this.state.wikiContent } />

                    <div className="title-area"> 
                        <h1 id='main-title'> <span> </span> Language Tree </h1>
                        <div className="info-maps-thanks-item" onClick={() => { this.clickMap() }} >
                            <span  role="img" aria-label="click to load a map image"> 🌲</span>
                        </div>
                    </div>
                    <div className="keys">
                        <LanguageStatusKeyAndSearch
                            handleSearchChange={ this.handleSearchChange }
                            handleSearchSubmit={ this.handleSearchSubmit }
                            sublist={ this.state.searchLanguagesSublist }
                            handleClickSubmit={ this.handleClickSubmit }
                            searchValue={ this.state.searchValue }
                            openWiki={ this.openWiki }
                        />
                        <div id="desktop-key">
                            <LanguagePercentageKey  />
                        </div>
                    </div>
                    <div className="tree-and-map-wrapper"> 
                        {
                            (this.state.searchOpen)
                            ?
                            <SearchResultsArea 
                                backToFamiliesViewFromSearch={ this.backToFamiliesViewFromSearch }
                                searchResult={ this.state.searchResult }
                                handleClickSubmit={ this.handleClickSubmit }
                                clickOnSearchPath={ this.clickOnSearchPath }
                                openWiki={ this.openWiki }
                            />
                            :
                                (this.state.languageFamiliesShowing)
                                ?
                                    <LanguageFamilies 
                                        languageFamiliesList={this.state.languageFamiliesList} 
                                        chooseLanguageFamily={this.chooseLanguageFamily}
                                    />
                                :
                                    (this.state.twoLevels) 
                                    ?
                                        <TreeArea 
                                            className="tree-area" 
                                            currentHead={ this.state.currentHead }    
                                            upClicky={ this.goBackUp }
                                            downClicky={ this.goDownOneLevel }
                                            languageHistory={ this.state.languageHeadHistory }
                                            twoLevels={ this.state.twoLevels }
                                            switchTreeView={ this.switchTreeView }
                                            backToFamiliesView={ this.backToFamiliesView }
                                            openWiki={ this.openWiki }
                                        />
                                    :
                                        <TreeAreaThreeLevels className="tree-area" 
                                            currentHead={ this.state.currentHead }    
                                            upClicky={ this.goBackUp }
                                            downClicky={ this.goDownOneLevel }
                                            languageHistory={ this.state.languageHeadHistory }
                                            twoLevels={ this.state.twoLevels }
                                            switchTreeView={ this.switchTreeView }
                                            backToFamiliesView={ this.backToFamiliesView }
                                        />
                        }
                        <div id="mobile-key">
                            <LanguagePercentageKey />
                        </div>
                        <MapArea   
                            className="map-area" 
                            languageFamiliesShowing={ this.state.languageFamiliesShowing }
                            searchSuccess={ this.state.searchSuccess }
                            countriesData={ this.state.currentHead }
                            accumulatedGeo={ this.state.accumulatedGeo }
                            percentagesGeo={ this.state.percentagesGeo }
                        />
                    </div>
                    <div className="details-area">
                        {
                            (!this.state.languageFamiliesShowing || this.state.searchSuccess)
                            ?
                            <DetailsComponent 
                                countryData={ this.state.currentHead }
                                accumulatedGeo={ this.state.accumulatedGeo }
                                percentagesGeo={ this.state.percentagesGeo }
                                openWiki={ this.openWiki }
                            />
                            :
                            <div className="waiting-for-details"> Choose a language family to see details here.. </div>
                        }
                    </div>
                </div>
            );
        }
        else {
            return (
                <div id="loader">
                    <h1> THE DATA IS LOADING... <span role="img" aria-label="little sprout"> 🌱</span></h1>
                </div>
            )
        }

    }
}

export default App;