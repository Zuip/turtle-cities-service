let insertQuestion = require('../../database/questions/insertQuestion');
let selectQuestion = require('../../database/questions/selectQuestion');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateQuestionLanguageVersions = require('../../services/validators/validateQuestionLanguageVersions');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateQuestionLanguageVersions(
      req.body.languageVersions,
      selectQuestion.withUrlNameAndLanguage
    ).catch(
      error => sendFailure(400, error)
    )
  ).then(
    () => insertQuestion(
      req.body.languageVersions
    ).catch(
      () => sendFailure(500, {
        success: false,
        message: "Saving question failed"
      })
    )
  ).then(() => {
    res.json({ success: true });
  }).catch(() => {
    // Promise chain ended
  });
};
