let db = require('../connection');

module.exports = function(questionLanguageVersions) {
  return insertQuestionBase().then(
    question => question.id
  ).then(questionId => {
    return createTranslatedQuestions(questionId, questionLanguageVersions);
  });
};

function createTranslatedQuestions(questionId, questionLanguageVersions) {
  return Promise.all(
    questionLanguageVersions.map(questionLanguageVersion => {
      return insertTranslatedQuestion(
        questionId,
        questionLanguageVersion.text,
        questionLanguageVersion.language
      );
    })
  );
}

function insertQuestionBase() {
  return db.one(`
    INSERT INTO question DEFAULT VALUES
    RETURNING id AS id
  `);
}

function insertTranslatedQuestion(questionId, text, language) {
  return db.none(
    `
      INSERT INTO translated_question (question_id, text, language)
      VALUES ($1, $2, $3)
    `,
    [questionId, text, language]
  );
}
