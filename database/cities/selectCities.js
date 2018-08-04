let db = require('../connection');

module.exports = {
  withCountryIdAndLanguage(countryId, language) {
    return db.any(
      `
        SELECT city.id AS city_id,
               country.id AS country_id,
               translated_city.name AS city_name,
               translated_country.name AS country_name
        FROM country
        JOIN city ON city.country_id = country.id
        JOIN translated_city ON translated_city.city_id = city.id
        JOIN translated_country ON (
          translated_country.country_id = country.id
          AND translated_city.language = translated_country.language
        )
        WHERE country.id = $1
        AND translated_city.language = $2
      `,
      [ countryId, language ]
    );
  },
  withIdsAndLanguage(ids, language) {
    return db.any(
      `
        SELECT city.id AS city_id,
               country.id AS country_id,
               translated_city.name AS city_name,
               translated_country.name AS country_name
        FROM country
        JOIN city ON city.country_id = country.id
        JOIN translated_city ON translated_city.city_id = city.id
        JOIN translated_country ON (
          translated_country.country_id = country.id
          AND translated_city.language = translated_country.language
        )
        WHERE city.id IN ($1:csv)
        AND translated_city.language = $2
      `,
      [ ids, language ]
    );
  },
  withLanguage(language) {
    return db.any(
      `
        SELECT city.id AS city_id,
               country.id AS country_id,
               translated_city.name AS city_name,
               translated_country.name AS country_name
        FROM country
        JOIN city ON city.country_id = country.id
        JOIN translated_city ON translated_city.city_id = city.id
        JOIN translated_country ON (
          translated_country.country_id = country.id
          AND translated_city.language = translated_country.language
        )
        WHERE translated_country.language = $1
      `,
      [ language ]
    );
  }
};
