let CountryDataNaming = require('../../services/dataNaming/Country');
let selectCountry = require('../../database/countries/selectCountry');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(
      req.query.language
    ).catch(() => sendFailure(
      404,
      'Missing mandatory get parameter: language'
    ))
  ).then(
    () => selectCountry.withIdAndLanguage(
      req.params.countryId,
      req.query.language
    ).then(country => {
      countryDataNaming = new CountryDataNaming();
      countryDataNaming.DBNamed = country;
      countryDataNaming.transformDBToAPINamed();
      return countryDataNaming.APINamed;
    }).catch(() => sendFailure(
      500,
      'There was an error in selecting the country from database'
    ))
  ).then(country => {
    res.json(country);
  }).catch(() => {
    // Promise chain ended
  })
};
