let insertCity = require('../../database/cities/insertCity');
let selectCity = require('../../database/cities/selectCity');
let selectCountry = require('../../database/countries/selectCountry');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateDestinationLanguageVersions = require('../../services/validators/validateDestinationLanguageVersions');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  return Promise.resolve().then(
    () => validateDestinationLanguageVersions(
      req.body.languageVersions,
      selectCity.withUrlNameAndLanguage
    ).catch(
      error => sendFailure(400, error)
    )
  ).then(
    () => selectCountry.withId(
      req.params.countryId
    ).catch(
      () => sendFailure(404, 'The country does not exist!')
    )
  ).then(
    () => insertCity(
      req.params.countryId,
      req.body.languageVersions,
      req.body.latitude,
      req.body.longitude
    ).catch(
      () => sendFailure(500, {
        success: false,
        message: 'Saving city failed'
      })
    )
  ).then(() => {
    res.json({ success: true });
  }).catch(() => {
    // Promise chain ended
  });
};
