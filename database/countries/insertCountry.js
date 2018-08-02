let db = require('../connection');

module.exports = function(countryLanguageVersions) {
  return insertCountryBase().then(
    country => country.id
  ).then(countryId => {
    return createTranslatedCountries(countryId, countryLanguageVersions);
  });
};

function createTranslatedCountries(countryId, countryLanguageVersions) {
  return Promise.all(
    countryLanguageVersions.map(countryLanguageVersion => {
      return insertTranslatedCountry(
        countryId,
        countryLanguageVersion.name,
        countryLanguageVersion.urlName,
        countryLanguageVersion.language
      );
    })
  );
}

function insertCountryBase() {
  return db.one(`
    INSERT INTO country DEFAULT VALUES
    RETURNING id AS id
  `);
}

function insertTranslatedCountry(countryId, name, urlName, language) {
  return db.none(
    `
      INSERT INTO translated_country (country_id, name, url_name, language)
      VALUES ($1, $2, $3, $4)
    `,
    [countryId, name, urlName, language]
  );
}
