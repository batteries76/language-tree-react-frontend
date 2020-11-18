import React from 'react';
import LanguageFamilyCard from './LanguageFamilyCard';

function LanguageFamilies({ languageFamiliesList, chooseLanguageFamily }) {

    // console.log("TREE AREA PROPS")
    // console.log(currentHead)

    return (
            <div className="language-families-area">
                <div className="head-card">
                    Language Families
                </div>
                <div className="children-wrapper">
                    {
                        (languageFamiliesList.length === 0) 
                        ?
                        <div className="top-of-tree"> 
                            <h2> No language families have loaded </h2>
                        </div>
                        :
                        languageFamiliesList.map((languageFamily, i) => {
                            return <LanguageFamilyCard 
                                        chooseLanguageFamily={ chooseLanguageFamily }
                                        languageFamily={languageFamily}
                                        key={ `${languageFamily}-${i}` }
                                    />
                        })
                    }
                </div>
            </div>
    );
}

export default LanguageFamilies;
