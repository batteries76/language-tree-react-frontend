import React from 'react';

// "countryName":"Czechia","languages":{"name":"Czech","percent":95.4,"note":"official"}

function CountryDetailsCard({ country }) {

  // console.log("COUNTRY DETAILS CARD")
  // console.log(country)

  return (
        <div className="country-details-card">
          <h2> { country.countryName }</h2>
            {
              (country.languages.percent) ? <h3> percentage: <span> { country.languages.percent } </span> </h3> : <h3> No Percentage Data </h3>
            }
            {
              (country.languages.note) ? <h3> note: { country.languages.note } </h3> : <h3>  </h3>
            }
        </div>
  );
}

export default CountryDetailsCard;