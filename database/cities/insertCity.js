let db = require('../connection');

module.exports = function(countryId, languageVersions, latitude, longitude) {
  return insertCityBase(
    countryId, latitude, longitude
  ).then(
    city => city.id
  ).then(cityId => {
    return createTranslatedCities(cityId, languageVersions);
  });
};

function createTranslatedCities(cityId, languageVersions) {
  return Promise.all(
    languageVersions.map(languageVersion => {
      return insertTranslatedCity(
        cityId,
        languageVersion.name,
        languageVersion.urlName,
        languageVersion.language
      );
    })
  );
}

function insertCityBase(countryId, latitude, longitude) {
  return db.one(
    `
      INSERT INTO city (country_id, latitude, longitude) VALUES ($1, $2, $3)
      RETURNING id AS id
    `,
    [countryId, latitude, longitude]
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
