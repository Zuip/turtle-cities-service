let CityDataNaming = require('../../services/dataNaming/City');
let selectCityTranslations = require('../../database/cities/selectCityTranslations');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  return Promise.resolve().then(
    () => selectCityTranslations.withId(
      req.params.cityId
    ).then(cityTranslations => {
      return cityTranslations.map(cityTranslation => {
        cityDataNaming = new CityDataNaming();
        cityDataNaming.DBNamed = cityTranslation;
        cityDataNaming.transformDBToAPINamed();
        return cityDataNaming.APINamed;
      });
    }).catch(() => sendFailure(
      500,
      'There was an error in selecting cities from database'
    ))
  ).then(
    city => res.json(city)
  ).catch(() => {
    // Promise chain ended
  });
};
