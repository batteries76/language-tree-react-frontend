import React from 'react';
import LangaugeHeadCard from './LanguageHeadCard';
import LanguageChildCard from './LanguageChildCard';
import LanguageGrandchildCard from './LanguageGrandchildCard'

function TreeAreaThreeLevels({ currentHead, upClicky, downClicky, languageHistory, switchTreeView, backToFamiliesView }) {

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
                        two levels
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
                <div id="up-3"> ^ </div>
                <div className="head-card-3">
                    <LangaugeHeadCard currentHead={currentHead} />
                </div>
                <div id="down-3"> v </div>
                <div className="children-wrapper">
                    {
                        (currentHead.children.length === 0) 
                        ?
                        <div className="top-of-tree"> 
                            <h2> Bottom of the tree </h2>
                        </div>
                        :
                        currentHead.children.map((child, i) => {
                            return (
                                    <div>
                                        <LanguageChildCard 
                                                childObject={child} 
                                                key={`${child.name}-${i}`}  
                                                downClicky={downClicky}
                                        />
                                        <div className="grand-children-wrapper">
                                            {
                                                (child.children.length === 0) 
                                                ?
                                                <div className="top-of-tree bottom-three"> 
                                                    <h2> Bottom of the tree </h2>
                                                </div>
                                                :
                                                <div>
                                                    {
                                                        child.children.map((grandchild, j) => {
                                                            console.log(grandchild.name)
                                                            return <LanguageGrandchildCard 
                                                                        childObject={grandchild} 
                                                                        key={`${grandchild.name}-${j}`} 
                                                                        downClicky={downClicky}
                                                                    />
                                                        })
                                                    }   
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
    );
}

export default TreeAreaThreeLevels;
