let db = require('../connection');

module.exports = {
  withLanguage(language) {
    return db.any(
      `
        SELECT question.id AS question_id,
               translated_question.text AS question_text
        FROM question
        JOIN translated_question ON (
          translated_question.question_id = question.id
        )
        WHERE translated_question.language = $1
      `,
      [language]
    );
  }
};
