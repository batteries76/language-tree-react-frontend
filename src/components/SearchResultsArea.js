import React from 'react';
import PathItem from './PathItem'
import SearchResultsMainCard from './SearchResultsMainCard';


function SearchResultsArea({ searchResult, backToFamiliesViewFromSearch, handleClickSubmit, clickOnSearchPath, openWiki }) {

    console.log("PROPS IN SEARCH RESULTS AREA")
    console.log(openWiki)

    if (searchResult) {
        return (
            <div className="search-results-area">
                <div 
                    className="back-to-families-from-search-button"
                    onClick={ () => { backToFamiliesViewFromSearch() }}
                >
                    <p>
                        Back to
                    </p> 
                    <p> 
                        families view
                    </p>
                </div>
                <div className="result-path-wrapper">
                    <div className="top-of-tree path-head"> Path </div>
                    {
                        searchResult.path.map((pathItem, i) => {
                            if (i === searchResult.path.length-1) {
                                return (
                                    <SearchResultsMainCard
                                        openWiki={ openWiki }
                                        pathItem={ pathItem }
                                        key={ `${pathItem}-${i}` }
                                    />
                                )
                            }
                            else {
                                return (
                                    <PathItem 
                                        clickOnSearchPath={ clickOnSearchPath }
                                        path={ searchResult.path.slice(0, i+1) }
                                        pathItem={ pathItem }
                                        key={ `${pathItem}-${i}` }
                                    /> 
                                )
                            }
                        })
                    }
                </div>
            </div>
        );
    } 
    else {

        return (
            <div className="search-results-area">
                <div 
                    className="back-to-families-from-search-button"
                    onClick={ () => { backToFamiliesViewFromSearch() }}
                >
                    <p>
                        Back to
                    </p> 
                    <p> 
                        families view
                    </p>
                </div>
                <div className="no-results">
                    <h1> No search results.. </h1>
                </div>
            </div>
        )
    }
    

}

export default SearchResultsArea;