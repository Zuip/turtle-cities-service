let db = require('../connection');

let selectFields = `
  city.id AS city_id,
  city.latitude AS city_latitude,
  city.longitude AS city_longitude,
  country.id AS country_id,
  translated_city.name AS city_name,
  translated_city.url_name AS city_url_name,
  translated_country.name AS country_name,
  translated_country.url_name AS country_url_name
`;

module.exports = {
  withCountryIdAndLanguage(countryId, language) {
    return db.any(
      `
        SELECT ${selectFields}
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
      [countryId, language]
    );
  },
  withIds(ids) {
    return db.any(
      `
        SELECT city.id AS city_id, country.id AS country_id
        FROM city
        JOIN country ON country.id = city.country_id
        WHERE city.id IN ($1:csv)
      `,
      [ids]
    );
  },
  withIdsAndLanguage(ids, language) {
    return db.any(
      `
        SELECT ${selectFields}
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
      [ids, language]
    );
  },
  withLanguage(language) {
    return db.any(
      `
        SELECT ${selectFields}
        FROM country
        JOIN city ON city.country_id = country.id
        JOIN translated_city ON translated_city.city_id = city.id
        JOIN translated_country ON (
          translated_country.country_id = country.id
          AND translated_city.language = translated_country.language
        )
        WHERE translated_country.language = $1
      `,
      [language]
    );
  }
};
