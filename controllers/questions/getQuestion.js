let QuestionDataNaming = require('../../services/dataNaming/Question');
let selectQuestion = require('../../database/questions/selectQuestion');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateLanguage = require('../../turtlelib/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(
    () => selectQuestion.withIdAndLanguage(
      req.params.questionId,
      req.query.language
    ).then(question => {
      let questionDataNaming = new QuestionDataNaming();
      questionDataNaming.DBNamed = question;
      questionDataNaming.transformDBToAPINamed();
      return questionDataNaming.APINamed;
    }).catch(() => sendFailure(
      500,
      'There was an error in selecting the question from database'
    ))
  ).then(
    question => res.json(question)
  ).catch(() => {
    // Promise chain ended
  });
};
