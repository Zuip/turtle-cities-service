let CountryDataNaming = require('../../services/dataNaming/Country');
let selectCountries = require('../../database/countries/selectCountries');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateLanguage = require('../../turtlelib/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(
      req.query.language
    ).catch(
      () => sendFailure(
        404,
        'Missing mandatory get parameter: language'
      )
    )
  ).then(
    () => selectCountries.withLanguage(
      req.query.language
    ).then(countries => {
      return countries.map(country => {
        let countryDataNaming = new CountryDataNaming();
        countryDataNaming.DBNamed = country;
        countryDataNaming.transformDBToAPINamed();
        return countryDataNaming.APINamed;
      });
    }).catch(
      () => sendFailure(
        500,
        'There was an error in selecting countries from database'
      )
    )
  ).then(countries => {
    res.json(countries);
  }).catch(() => {
    // Promise chain ended
  });
};
