let insertCountry = require('../../database/countries/insertCountry');
let selectCountry = require('../../database/countries/selectCountry');
let sendFailureToRes = require('../../turtlelib/routing/sendFailureToRes');
let validateDestinationLanguageVersions = require('../../services/validators/validateDestinationLanguageVersions');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateDestinationLanguageVersions(
      req.body.languageVersions,
      selectCountry.withUrlNameAndLanguage
    ).catch(
      error => sendFailure(400, error)
    )
  ).then(
    () => insertCountry(
      req.body.languageVersions
    ).catch(
      () => sendFailure(500, {
        success: false,
        message: 'Saving country failed'
      })
    )
  ).then(() => {
    res.json({ success: true });
  }).catch(() => {
    // Promise chain ended
  });
};
