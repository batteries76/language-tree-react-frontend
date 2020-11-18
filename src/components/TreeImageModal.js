import React from 'react';

// import languageTreeImage from '../images/1159px-IndoEuropeanTree.svg.png'

function TreeImageModal(props) {

    // console.log("PROPS IN IMAGE MODAL *********************************")
    // console.log(props)

    let wrapperclassName = 'modal-wrapper'
    let className = 'map-modal'

    if (props.show) {
            wrapperclassName = 'modal-wrapper show-wrapper'
            className = 'map-modal show-modal'
    }

    return (
            <div className={ wrapperclassName } onClick={ () => { props.hide() } } >
                <div className={ className } onClick={ (e) => e.stopPropagation() } >
                    <img src={ props.treeImage } alt="full map of the language family tree"></img>
                    {/* <img src='/images/Dene-Caucasian-Tree.png' alt="full map of the language family tree"></img>  */}
                </div>
            </div>
        );

}

export default TreeImageModal;