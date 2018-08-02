let db = require('../connection');

module.exports = function(countryId, languageVersions) {
  return insertCityBase(
    countryId
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

function insertCityBase(countryId) {
  return db.one(
    `
      INSERT INTO city (country_id) VALUES ($1)
      RETURNING id AS id
    `,
    [countryId]
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
