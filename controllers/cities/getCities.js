let CityDataNaming = require('../../services/dataNaming/City');
let mapCitiesToCountries = require('../../services/mapCitiesToCountries');
let selectCities = require('../../database/cities/selectCities');
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
    () => selectCities.withLanguage(
      req.query.language
    ).then(cities => {
      return cities.map(city => {
        cityDataNaming = new CityDataNaming();
        cityDataNaming.DBNamed = city;
        cityDataNaming.transformDBToAPINamed();
        return cityDataNaming.APINamed;
      });
    }).catch(() => sendFailure(
      500,
      'There was an error in selecting cities from database'
    ))
  ).then(cities => {
    res.json(mapCitiesToCountries(cities));
  }).catch(() => {
    // Promise chain ended
  })
};
