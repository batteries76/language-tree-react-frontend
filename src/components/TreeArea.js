import React from 'react';
import LanguageHeadCard from './LanguageHeadCard';
import LanguageChildCard from './LanguageChildCard';

function TreeArea({ currentHead, upClicky, downClicky, languageHistory, switchTreeView, backToFamiliesView, openWiki }) {

    // console.log("TREE AREA PROPS")
    // console.log(currentHead)

    return (
            <div className="tree-area">
                <div 
                    className="change-tree-format-button"
                    onClick={ () => { switchTreeView() }}
                >
                    <p>
                        Switch to:
                    </p> 
                    <p> 
                        three levels
                    </p>
                </div>
                <div 
                    className="back-to-families-button"
                    onClick={ () => { backToFamiliesView() }}
                >
                    <p>
                        Back to
                    </p> 
                    <p> 
                        families view
                    </p>
                </div>
                {
                    (languageHistory.length < 2) ?
                    <div className="top-of-tree">
                        <h2> Top of Tree </h2>
                    </div>
                    :
                    <div className="go-back-up" onClick={ () => upClicky() }>
                        <h2> Go Back Up </h2>
                    </div>
                }
                <div id="up"> ^ </div>
                <div className="head-card">
                    <LanguageHeadCard 
                        currentHead={ currentHead } 
                        openWiki={ openWiki }
                    />
                </div>
                <div id="down"> v </div>
                <div className="children-wrapper">
                    {
                        (currentHead.children.length === 0) 
                        ?
                        <div className="top-of-tree"> 
                            <h2> Bottom of the tree </h2>
                        </div>
                        :
                        currentHead.children.map((child, i) => {
                            return <LanguageChildCard 
                                        childObject={child} 
                                        key={i} 
                                        downClicky={downClicky}
                                    />
                        })
                    }
                </div>
            </div>
    );
}

export default TreeArea;
