import React from 'react';

function SearchListItem( { handleClickSubmit, languageName } ) {
  console.log("PROPS IN SEARCH LIST ITEM")
  console.log()

  return (
        <div 
            className="search-item"
            onClick={ () => handleClickSubmit(languageName) }
        >
            {languageName}
        </div>
    );

}

export default SearchListItem;