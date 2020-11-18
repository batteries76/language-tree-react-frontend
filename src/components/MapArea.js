import React from 'react';
import GoogleApiPolygonWithJS from './GoogleApiPolygonWithJS'

function MapArea(props) {

//   console.log("PROPS IN MAP AREA")
//   console.log(props)

  return (
        <div className="map-area">
            {
                (!props.languageFamiliesShowing || props.searchSuccess)
                ?
                    (!props.accumulatedGeo && !props.percentagesGeo)
                    ?
                    <h1> 
                        Maps are loading.. 
                    </h1>
                    :
                    <h1> 
                        { `Maps: ${props.countriesData.name}` } 
                    </h1>
                :
                <h1> Nothing just yet.. </h1>
            }   

            <div id="js-map">
                <GoogleApiPolygonWithJS 
                    id='map'
                    className="map-zone"
                    countriesData={ props.countriesData }
                    accumulatedGeo={ props.accumulatedGeo }
                    percentagesGeo={ props.percentagesGeo }
                    languageFamiliesShowing={ props.languageFamiliesShowing }
                    searchSuccess={ props.searchSuccess }
                />
            </div>
        </div>
    );

}

export default MapArea;
