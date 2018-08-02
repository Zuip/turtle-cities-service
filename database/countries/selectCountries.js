let db = require('../connection');

module.exports = {
  withLanguage(language) {
    return db.any(
      `
        SELECT country.id AS country_id,
               translated_country.name AS country_name
        FROM country
        JOIN translated_country ON (
          translated_country.country_id = country.id
        )
        WHERE translated_country.language = $1
      `,
      [ language ]
    );
  }
};
