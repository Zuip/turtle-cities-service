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
  withUrlNameAndLanguage(urlName, language) {
    return db.one(
      `
        SELECT city.id AS city_id,
               translated_city.name AS city_name,
               translated_city.url_name AS city_url_name,
               translated_city.language AS city_language
        FROM translated_city
        JOIN city ON city.id = translated_city.city_id
        WHERE translated_city.url_name = $1
        AND translated_city.language = $2
      `,
      [ urlName, language ]
    );
  }
};
