let validateName = require('./validateName');

module.exports = function(urlName) {

  if(!validateName(urlName)) {
    return false;
  }
  
  return (/[a-z_-]/.test(urlName));
};