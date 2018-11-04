let CityDataNaming = require('../../services/dataNaming/City');
let selectCity = require('../../database/cities/selectCity');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  if (typeof req.query.language === 'undefined') {
    return Promise.resolve().then(
      () => selectCity.withId(
        req.params.cityId
      ).catch(() => sendFailure(
        500,
        'There was an error in selecting the from database'
      )).then(cityLanguageVersions => {

        if (cityLanguageVersions.length === 0) {
          return sendFailure(404);
        }

        return cityLanguageVersions;

      }).then(cityLanguageVersions => ({
        id: cityLanguageVersions[0].city_id,
        latitude: cityLanguageVersions[0].city_latitude,
        longitude: cityLanguageVersions[0].city_longitude,
        languageVersions: cityLanguageVersions.map(
          cityLanguageVersion => {

            cityDataNaming = new CityDataNaming();
            cityDataNaming.DBNamed = cityLanguageVersion;
            cityDataNaming.transformDBToAPINamed();

            let APINamed = cityDataNaming.APINamed;
            delete APINamed.id;
            delete APINamed.latitude;
            delete APINamed.longitude;

            return APINamed;
          }
        )
      }))
    ).then(
      city => res.json(city)
    ).catch(() => {
      // Promise chain ended
    });
  }

  Promise.resolve().then(
    () => validateLanguage(
      req.query.language
    ).catch(() => sendFailure(
      404,
      'Missing mandatory get parameter: language'
    ))
  ).then(
    () => selectCity.withIdAndLanguage(
      req.params.cityId,
      req.query.language
    ).then(city => {
      cityDataNaming = new CityDataNaming();
      cityDataNaming.DBNamed = city;
      cityDataNaming.transformDBToAPINamed();
      return cityDataNaming.APINamed;
    }).catch(() => sendFailure(
      500,
      'There was an error in selecting the city from database'
    ))
  ).then(city => {
    res.json(city);
  }).catch(() => {
    // Promise chain ended
  });
};
