import React from 'react';

function LanguageFamilyCard({ languageFamily, chooseLanguageFamily }) {

//   console.log("CHILD CARD")
//   console.log(childObject)

  return (
        <div 
            className={`language-card-child`}
            onClick={ () => chooseLanguageFamily(languageFamily) }
        >
            <h3> { languageFamily } </h3>
        </div>
  );
}

export default LanguageFamilyCard;