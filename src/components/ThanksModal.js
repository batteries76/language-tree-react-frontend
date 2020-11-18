import React from 'react';

function ThanksModal(props) {

    // console.log("PROPS IN THANKS AREA")
    // console.log(props)

    let wrapperclassName = 'modal-wrapper'
    let className = 'thanks-modal'

    if (props.show) {
            wrapperclassName = 'modal-wrapper show-wrapper'
            className = 'thanks-modal show-modal'
    }

    return (
            <div className={ wrapperclassName } onClick={ () => { props.hide() } } >
                <div className={ className } onClick={ (e) => e.stopPropagation() } >
                    <h2> THANKS </h2>
                    <span role="img" aria-label="small leafy tree branch"> 🌿 </span>
                    <p>
                        It's a bit much to have a dedication attached to such a small project, but it is nice to have an opportunity to do so, so I will take it.. 
                    </p>
                    <p>
                        This site is dedicated to my grandfather Bill Burnett. He loved learning of all sorts, including and especially languages. He was a tremendously curious and intelligent man, and is still an inspiration to me.
                    </p>
                    <span role="img" aria-label="small leafy tree branch"> 🌿 </span>
                    <p>
                        Thanks to my lovely wife Olivia for being patient while I pushed through to the MVP (and to little Heidi bug too).
                    </p>
                    <p>
                        Thanks to all those who had a go at the site, and gave feedback/encouragement: Ben M, Simon D, Conor P, Damon S, Gretch S, Steve C, Pat S, and particularly Chris E who always jumps in and offers awesome testing and encouragement every time. This isn't to exclude anyone.. cheers also to those not listed, but who took an interest. I'm tired now, so will have forgotten people - will rectify when my brain reloads. 
                    </p>
                </div>
            </div>
        );

}

export default ThanksModal;