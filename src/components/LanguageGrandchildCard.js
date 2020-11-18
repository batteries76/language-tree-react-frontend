import React from 'react';

function LanguageGrandchildCard({ childObject, downClicky }) {

//   console.log("CHILD CARD")
//   console.log(childObject)

  return (
        <div 
            className={`language-card-grandchild ${childObject.alive}`}
            onClick={ () => downClicky(childObject) }
        >
            <h3> { childObject.name } </h3>
        </div>
  );
}

export default LanguageGrandchildCard;