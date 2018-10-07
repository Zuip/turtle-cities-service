let db = require('../connection');
let selectCity = require('./selectCity');

module.exports = function(cityId, newTranslations, latitude, longitude) {
  return updateCityBase(
    cityId, latitude, longitude
  ).then(
    () => updateTranslatedCities(cityId, newTranslations)
  );
};

function updateTranslatedCities(cityId, newTranslations) {
  return selectCity.withId(
    cityId
  ).then(previousTranslations => previousTranslations.map(
    previousTranslations => previousTranslations.city_language
  )).then(previousTranslations => Promise.all([
    createNewTranslations(cityId, newTranslations, previousTranslations),
    updateExistingTranslations(cityId, newTranslations, previousTranslations),
    removeExistingTranslations(cityId, newTranslations, previousTranslations)
  ]));
}

function createNewTranslations(cityId, newTranslations, previousTranslations) {
  return Promise.all(
    newTranslations.filter(
      newTranslation => !previousTranslations.includes(
        newTranslation.language
      )
    ).map(newTranslation => insertTranslatedCity(
      cityId,
      newTranslation.name,
      newTranslation.urlName,
      newTranslation.language
    ))
  );
}

function updateExistingTranslations(cityId, newTranslations, previousTranslations) {
  return Promise.all(
    newTranslations.filter(
      newTranslation => previousTranslations.includes(
        newTranslation.language
      )
    ).map(newTranslation => updateTranslatedCity(
      cityId,
      newTranslation.name,
      newTranslation.urlName,
      newTranslation.language
    ))
  );
}

function removeExistingTranslations(cityId, newTranslations, previousTranslations) {
  return Promise.all(
    previousTranslations.filter(
      previousTranslation => !newTranslations.find(
        newTranslation => newTranslation.language === previousTranslation
      )
    ).map(previousTranslation => deleteTranslatedCity(
      cityId,
      previousTranslation
    ))
  );
}

function updateCityBase(cityId, latitude, longitude) {
  return db.none(
    `
      UPDATE city
      SET
        latitude = $2,
        longitude = $3
      WHERE id = $1
    `,
    [cityId, latitude, longitude]
  );
}

function insertTranslatedCity(cityId, name, urlName, language) {
  return db.none(
    `
      INSERT INTO translated_city (city_id, name, url_name, language)
      VALUES ($1, $2, $3, $4)
    `,
    [cityId, name, urlName, language]
  );
}

function updateTranslatedCity(cityId, name, urlName, language) {
  return db.none(
    `
      UPDATE translated_city
      SET
        name = $2,
        url_name = $3
      WHERE city_id = $1
      AND language = $4
    `,
    [cityId, name, urlName, language]
  );
}

function deleteTranslatedCity(cityId, language) {
  return db.none(
    `
      DELETE FROM translated_city
      WHERE city_id = $1
      AND language = $2
    `,
    [cityId, language]
  );
}