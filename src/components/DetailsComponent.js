import React from 'react';
import CountryDetailsCard from './CountryDetailsCard'

function DetailsComponent({ countryData, accumulatedGeo, percentagesGeo, openWiki }) {

  // console.log("DETAILS COMPONENT PROPS")
  // console.log(percentagesGeo)

  var familyCountries = []

  if (countryData.alive === 'f') {
    if (accumulatedGeo) {
      if (accumulatedGeo.geo) {
        familyCountries = accumulatedGeo.geo.map((country, i) => {
            return country.countryName
        })
      }
    }
  }
//   familyCountries = familyCountries.filter((x, i, a) => a.indexOf(x) == i)

  function uniqueArray0(array) {
    var result = Array.from(new Set(array));
    return result    
  }

  const validateCountryNumbers = (percentagesGeo) => {
    if (percentagesGeo) {
      if (percentagesGeo.countriesPercentagesCodesAndGeo) {
        return `(${percentagesGeo.countriesPercentagesCodesAndGeo.length})`
      }
    }
    return ""
  }

  familyCountries = uniqueArray0(familyCountries)

  return (
      <div className="details-wrapper">
        <div className="details-header" onClick={ () => openWiki(countryData.name) }>
            <h2> Language Details: </h2>
            <h2> <span> { countryData.name } </span> </h2>
        </div>
        <div className="header-and-card-details-wrapper">
          {
              (countryData.alive !== 'f')
              ?
              <div>
                <div>
                  <h1> Countries: {validateCountryNumbers(percentagesGeo)} </h1>
                </div>
                <div className="country-details">
                  {
                    (percentagesGeo)
                    ?
                      (percentagesGeo.countriesPercentagesCodesAndGeo)
                      ?
                        (percentagesGeo.countriesPercentagesCodesAndGeo.length !== 0)
                        ?
                          percentagesGeo.countriesPercentagesCodesAndGeo.map((country, i) => {
                                      return <CountryDetailsCard
                                                  country={country} 
                                                  key={i} 
                                              />
                                  })
                          :
                          <h2> no countries listed. </h2>
                      :
                      <h2> no countries listed. </h2>
                    :
                    <h2> percentage data loading.. </h2>
                  }
                </div>
              </div>
              :
              <div>
                <div>
                    <h1> Language Family's Countries ({familyCountries.length}):  </h1>
                </div>
                <div className="family-countries-area"> 
                    {
                      (accumulatedGeo)
                      ?
                        (accumulatedGeo.geo)
                        ?
                        familyCountries.map((countryName, i) => {
                                        return ( 
                                            <div className="families-country-card" key={i}>
                                                <h2>
                                                    { countryName }
                                                </h2>
                                            </div>
                                        )
                                    })
                        :
                        <h2> No countries listed for this family </h2>
                      :
                      <h2> Country data is loading </h2>
                    }
                </div>
              </div>
          }
          </div>
      </div>
  );
}

export default DetailsComponent;