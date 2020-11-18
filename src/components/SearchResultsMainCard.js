import React from 'react';

// import languageTreeImage from '../images/1159px-IndoEuropeanTree.svg.png'

function SearchResultsMainCard({ openWiki, pathItem }) {

    console.log("PROPS IN SEARCH RESULTS MAIN CARD")
    console.log(openWiki)

    return (
            <div 
                className={`language-card-head-title ${pathItem.alive} path-main-result`}
                onClick={ () => { openWiki(pathItem.name) }}
            >
                <h2> { pathItem.name } </h2>
            </div>
        );

}

export default SearchResultsMainCard;