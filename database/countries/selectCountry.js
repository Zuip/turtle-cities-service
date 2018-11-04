let db = require('../connection');

module.exports = {
  withId(id) {
    return db.one(
      `
        SELECT country.id AS country_id
        FROM country
        WHERE country.id = $1
      `,
      [id]
    );
  },
  withIdAndLanguage(id, language) {
    return db.one(
      `
        SELECT country.id AS country_id,
               translated_country.name AS country_name,
               translated_country.url_name AS country_url_name
        FROM country
        JOIN translated_country ON translated_country.country_id = country.id
        WHERE country.id = $1
        AND translated_country.language = $2
      `,
      [id, language]
    );
  },
  withUrlNameAndLanguage(urlName, language) {
    return db.one(
      `
        SELECT country.id AS country_id,
               translated_country.name AS country_name,
               translated_country.url_name AS country_url_name
        FROM country
        JOIN translated_country ON translated_country.country_id = country.id
        WHERE translated_country.url_name = $1
        AND translated_country.language = $2
      `,
      [urlName, language]
    );
  }
};
