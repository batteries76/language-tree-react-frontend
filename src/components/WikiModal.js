import React from 'react';

function WikiModal(props) {

  console.log("PROPS IN WIKI MODAL")
  console.log(props)

  let wrapperclassName = 'modal-wrapper'
  let modalClassName = 'wiki-modal'

  if (props.show) {
      console.log("WIKI MODAL RUE")
      wrapperclassName = 'modal-wrapper show-wrapper'
      modalClassName = 'wiki-modal show-modal'
  }

  return (  
        <div className={ wrapperclassName } onClick={ () => { props.hide() } } >
            <div className={ modalClassName } onClick={ (e) => e.stopPropagation() } >
                <h2> Wiki Info </h2>
                <h3> *Don't click links in this page: they will not work!!</h3>
                {
                    (props.wikiContent)
                    ?
                    <div className="wiki-content" dangerouslySetInnerHTML={{__html: props.wikiContent.data}}>
                        
                    </div>
                    :
                    <div> 
                        <h2> Content is loading.. </h2>
                    </div>
                }
               
              
            </div>
        </div>
    );

}

export default WikiModal;