let QuestionDataNaming = require('../../services/dataNaming/Question');
let selectQuestions = require('../../database/questions/selectQuestions');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(
    () => selectQuestions.withLanguage(
      req.query.language
    ).then(questions => {
      return questions.map(question => {
        let questionDataNaming = new QuestionDataNaming();
        questionDataNaming.DBNamed = question;
        questionDataNaming.transformDBToAPINamed();
        return questionDataNaming.APINamed;
      });
    }).catch(
      () => sendFailure(
        500,
        'There was an error in selecting questions from database'
      )
    )
  ).then(
    questions => res.json(questions)
  ).catch(() => {
    // Promise chain ended
  });
};
