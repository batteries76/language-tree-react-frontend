import React from 'react';

function InfoMapsThanks(props) {

    // console.log("PROPS IN INFO AREA")

    return (
            <div className="info-maps-thanks">
                <div className="info-maps-thanks-item" onClick={() => { props.clickInfo() }} >
                    <span role="img" aria-label="info about language tree" id="info"> ℹ </span>
                </div>
                <div 
                    className="info-maps-thanks-item" 
                    onClick={() => { props.clickThanks() }} 
                >
                    <span role="img" aria-label="thanks and help"> 🤗 </span>
                </div>
            </div>
        );

}

export default InfoMapsThanks;