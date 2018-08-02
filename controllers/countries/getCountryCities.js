let CityDataNaming = require('../../services/dataNaming/City');
let selectCities = require('../../database/cities/selectCities');
let selectCountry = require('../../database/countries/selectCountry');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(
      req.query.language
    ).catch(
      () => sendFailure(
        404,
        'Missing mandatory get parameter: language'
      )
    )
  ).then(
    () => selectCountry.withIdAndLanguage(
      req.params.countryId,
      req.query.language
    ).catch(
      () => sendFailure(404, 'The country does not exist!')
    )
  ).then(
    () => selectCities.withCountryIdAndLanguage(
      req.params.countryId,
      req.query.language
    ).then(cities => {
      return cities.map(city => {
        let cityDataNaming = new CityDataNaming();
        cityDataNaming.DBNamed = city;
        cityDataNaming.transformDBToAPINamed();
        return cityDataNaming.APINamed;
      });
    }).catch(
      () => sendFailure(
        500,
        'There was an error in selecting cities from database'
      )
    )
  ).then(cities => {
    res.json(cities);
  }).catch(() => {
    // Promise chain ended
  });
};
