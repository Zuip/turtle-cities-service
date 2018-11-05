let CityDataNaming = require('../../services/dataNaming/City');
let mapCitiesToCountries = require('../../services/mapCitiesToCountries');
let selectCities = require('../../database/cities/selectCities');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateLanguage = require('../../turtlelib/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(
      req.query.language,
      sendFailure
    )
  ).then(
    () => getSelectCitiesPromise(
      req
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
  });
};

function getSelectCitiesPromise(req) {

  if (typeof req.params.cityId !== 'undefined') {
    return selectCities.withCountryIdAndLanguage(
      req.params.cityId,
      req.query.language
    );
  }

  if (typeof req.query.ids !== 'undefined') {
    return selectCities.withIdsAndLanguage(
      req.query.ids.split(','),
      req.query.language
    );
  }

  return selectCities.withLanguage(
    req.query.language
  );
}
