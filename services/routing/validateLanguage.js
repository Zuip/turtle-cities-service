let validateLanguage = require('../validators/validateLanguage');

module.exports = function(language) {

  if(validateLanguage(language)) {
    return Promise.resolve();
  }

  return Promise.reject();
}