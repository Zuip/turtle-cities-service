let getLanguage = require('../../integrations/languages/getLanguage');

module.exports = function(language, sendFailure) {

  if(typeof language === 'undefined') {
    return sendFailure(
      404,
      'Missing mandatory get parameter: language'
    );
  }

  return getLanguage.withCode(language).then(
    () => Promise.resolve()
  ).catch(
    () => sendFailure(
      400,
      'Invalid get parameter: language'
    )
  );
};