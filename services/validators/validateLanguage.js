let validateName = require('./validateName');

module.exports = function(language) {

  if(!validateName(language)) {
    return false;
  }

  return language.length === 2;
}