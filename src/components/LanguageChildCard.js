import React from 'react';

function LanguageChildCard({ childObject, downClicky }) {

//   console.log("CHILD CARD")
//   console.log(childObject)

  return (
        <div 
            className={`language-card-child ${childObject.alive}`}
            onClick={ () => downClicky(childObject) }
        >
            <h3> { childObject.name } </h3>
        </div>
  );
}

export default LanguageChildCard;