let db = require('../connection');

module.exports = {
  withId(id) {
    return db.any(
      `
        SELECT city.id AS city_id,
               translated_city.name AS city_name,
               translated_city.url_name AS city_url_name,
               translated_city.language AS city_language,
               country.id AS country_id,
               translated_country.name AS country_name,
               translated_country.url_name AS country_url_name
        FROM city
        JOIN translated_city ON translated_city.city_id = city.id
        JOIN country ON country.id = city.country_id
        JOIN translated_country ON (
          translated_country.country_id = country.id
          AND translated_country.language = translated_city.language
        )
        WHERE city.id = $1
      `,
      [ id ]
    );
  }
};
