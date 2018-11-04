let db = require('../connection');

module.exports = {
  withId(id) {
    return db.one(
      `
        SELECT question.id AS question_id
        FROM question
        WHERE question.id = $1
      `,
      [id]
    );
  },
  withIdAndLanguage(id, language) {
    return db.one(
      `
        SELECT question.id AS question_id,
               translated_question.text AS question_text
        FROM question
        JOIN translated_question ON translated_question.question_id = question.id
        WHERE question.id = $1
        AND translated_question.language = $2
      `,
      [id, language]
    );
  }
};
