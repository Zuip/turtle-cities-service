let CountryDataNaming = require('../../services/dataNaming/Country');
let selectCountry = require('../../database/countries/selectCountry');
let selectCountryTranslations = require('../../database/countries/selectCountryTranslations');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateLanguage = require('../../turtlelib/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  return validateLanguageParameter(
    req,
    sendFailure
  ).then(
    () => getSelectCountryPromise(
      req
    ).then(
      country => selectCountryTranslations.withId(country.country_id)
    ).then(
      countryTranslations => countryTranslations.map(
        countryTranslation => {
          countryDataNaming = new CountryDataNaming();
          countryDataNaming.DBNamed = countryTranslation;
          countryDataNaming.transformDBToAPINamed();
          return countryDataNaming.APINamed;
        }
      )
    ).catch(error => sendFailure(
      500,
      'There was an error in selecting the country from database' + error
    ))
  ).then(country => {
    res.json(country);
  }).catch(() => {
    // Promise chain ended
  });
};

function validateLanguageParameter(req, sendFailure) {

  if (isNaN(req.params.countryId)) {
    return Promise.resolve().then(
      () => validateLanguage(req.query.language, sendFailure)
    );
  }

  return Promise.resolve();
}

function getSelectCountryPromise(req) {

  if (isNaN(req.params.countryId)) {
    return selectCountry.withUrlNameAndLanguage(
      req.params.countryId,
      req.query.language
    );
  }

  return selectCountry.withId(
    req.params.countryId
  );
}
