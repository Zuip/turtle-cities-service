let CityDataNaming = require('../../services/dataNaming/City');
let selectCity = require('../../database/cities/selectCity');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateLanguage = require('../../turtlelib/routing/validateLanguage');

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
    () => selectCity.withCountryUrlNameAndCityUrlNameAndLanguage(
      req.params.countryUrlName,
      req.params.cityUrlName,
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
