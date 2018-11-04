let updateCity = require('../../database/cities/updateCity');
let selectCity = require('../../database/cities/selectCity');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateDestinationLanguageVersions = require('../../services/validators/validateDestinationLanguageVersions');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  return Promise.resolve().then(
    () => validateDestinationLanguageVersions(
      req.body.languageVersions,
      (urlName, language) => selectCity.withUrlNameAndLanguage(
        urlName,
        language
      ).then(city => {

        if (parseInt(city.city_id) === parseInt(req.params.cityId)) {
          return Promise.reject();
        }

        return city;
      })
    ).catch(
      error => sendFailure(400, error)
    )
  ).then(
    () => updateCity(
      req.params.cityId,
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
