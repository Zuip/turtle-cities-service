let CountryDataNaming = require('../../services/dataNaming/Country');
let selectCountry = require('../../database/countries/selectCountry');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateLanguage = require('../../turtlelib/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  return Promise.resolve().then(
    () => validateLanguage(
      req.query.language
    ).catch(() => sendFailure(
      404,
      'Missing mandatory get parameter: language'
    ))
  ).then(
    () => getSelectCountryPromise(
      req
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
  });
};

function getSelectCountryPromise(req) {

  if (isNaN(req.params.countryId)) {
    return selectCountry.withUrlNameAndLanguage(
      req.params.countryId,
      req.query.language
    );
  }

  return selectCountry.withIdAndLanguage(
    req.params.countryId,
    req.query.language
  );
}
