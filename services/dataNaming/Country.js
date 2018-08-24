let isEmptyObject = require('../objectFunctionalities/isEmptyObject');

module.exports = function() {

  this.APINamed = undefined;
  this.DBNamed = undefined;

  this.transformDBToAPINamed = function() {

    if(typeof this.DBNamed === 'undefined') {
      return;
    }

    this.APINamed = {
      id: this.DBNamed.country_id,
      language: this.DBNamed.country_language,
      name: this.DBNamed.country_name,
      urlName: this.DBNamed.country_url_name
    };

    if(isEmptyObject(this.APINamed)) {
      this.APINamed = undefined;
    }
  };
};