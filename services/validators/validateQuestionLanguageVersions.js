let validateLanguage = require('./validateLanguage');
let validateName = require('./validateName');

module.exports = function(questionLanguageVersions) {

  if (!Array.isArray(questionLanguageVersions)
     || questionLanguageVersions.length === 0) {

    return Promise.reject({
      code: 'no_language_versions',
      element: 'language_version',
      success: false
    });

  }

  return Promise.all(
    questionLanguageVersions.map(
      questionLanguageVersion => validateQuestionLanguageVersion(
        questionLanguageVersion
      )
    )
  );
};

function validateQuestionLanguageVersion(question) {

  let getErrorMessage = getErrorMessageFor(question.language);

  if (!validateLanguage(question.language)) {
    return Promise.reject(
      getErrorMessage('language', 'invalid')
    );
  }

  if (!validateName(question.text)) {
    return Promise.reject(
      getErrorMessage('text', 'invalid')
    );
  }
}

function getErrorMessageFor(language) {
  return function(element, code) {
    return {
      code,
      element,
      language,
      success: false
    };
  };
}
