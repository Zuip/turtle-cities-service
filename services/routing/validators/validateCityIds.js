let selectCities = require('../../../database/cities/selectCities');

module.exports = function(cityIds, sendFailure) {

  if(cityIds.length === 0) {
    return Promise.resolve();
  }

  return Promise.resolve().then(
    () => selectCities.withIds(
      cityIds
    ).catch(
      () => sendFailure(
        500,
        'Error in fetching cities from database'
      )
    )
  ).then(
    validCities => Promise.resolve().then(
      () => validCities.map(
        validCity => parseInt(validCity.city_id)
      )
    ).then(
      validCityIds => validateCityIds(
        cityIds,
        validCityIds
      )
    ).then(
      () => Promise.resolve()
    ).catch(
      invalidCityId => sendFailure(
        400,
        'Invalid city id: ' + invalidCityId
      )
    )
  );
};

function validateCityIds(cityIds, validCityIds) {
  return Promise.all(
    cityIds.map(cityId => {

      if(validCityIds.includes(parseInt(cityId))) {
        return Promise.resolve();
      }

      return Promise.reject(cityId);
    })
  );
}