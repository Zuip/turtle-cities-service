let db = require('../connection');

module.exports = {
  withId(id) {
    return db.one(
      `
        SELECT city.id AS city_id
        FROM city
        WHERE city.id = $1
      `,
      [ id ]
    );
  },
  withIdAndLanguage(id, language) {
    return db.one(
      `
        SELECT city.id AS city_id,
               translated_city.name AS city_name,
               translated_city.url_name AS city_url_name,
               translated_city.language AS city_language,
               country.id AS country_id,
               translated_country.name AS country_name,
               translated_country.url_name AS country_url_name
        FROM translated_city
        JOIN city ON city.id = translated_city.city_id
        JOIN country ON country.id = city.country_id
        JOIN translated_country ON (
          translated_country.country_id = country.id
          AND translated_country.language = translated_city.language
        )
        WHERE city.id = $1
        AND translated_city.language = $2
      `,
      [ id, language ]
    );
  },
  withUrlNameAndLanguage(urlName, language) {
    return db.one(
      `
        SELECT city.id AS city_id,
               translated_city.name AS city_name,
               translated_city.url_name AS city_url_name,
               translated_city.language AS city_language,
               country.id AS country_id,
               translated_country.name AS country_name,
               translated_country.url_name AS country_url_name
        FROM translated_city
        JOIN city ON city.id = translated_city.city_id
        JOIN country ON country.id = city.country_id
        JOIN translated_country ON (
          translated_country.country_id = country.id
          AND translated_country.language = translated_city.language
        )
        WHERE translated_city.url_name = $1
        AND translated_city.language = $2
      `,
      [ urlName, language ]
    );
  },
  withCountryUrlNameAndCityUrlNameAndLanguage(countryUrlName, cityUrlName, language) {
    return db.one(
      `
        SELECT city.id AS city_id,
               translated_city.name AS city_name,
               translated_city.url_name AS city_url_name,
               translated_city.language AS city_language,
               country.id AS country_id,
               translated_country.name AS country_name,
               translated_country.url_name AS country_url_name
        FROM translated_city
        JOIN city ON city.id = translated_city.city_id
        JOIN country ON country.id = city.country_id
        JOIN translated_country ON (
          translated_country.country_id = country.id
          AND translated_country.language = translated_city.language
        )
        WHERE translated_country.url_name = $1
        AND translated_city.url_name = $2
        AND translated_city.language = $3
      `,
      [ countryUrlName, cityUrlName, language ]
    );
  }
};
