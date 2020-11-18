import React from 'react';

function PathItem( { pathItem, clickOnSearchPath, path } ) {

  console.log("PROPS IN PATH ITEM")
  console.log()

  return (
        <div 
            className={`${pathItem.alive} path-result`}
            onClick={ () => clickOnSearchPath(path) }
        >
            { pathItem.name } 
        </div>
    );

}

export default PathItem;