let CountryDataNaming = require('./Country');
let isEmptyObject = require('../objectFunctionalities/isEmptyObject');

module.exports = function() {

  this.APINamed = undefined;
  this.DBNamed = undefined;

  this.transformDBToAPINamed = function() {

    if(typeof this.DBNamed === 'undefined') {
      return;
    }

    let countryDataNaming = new CountryDataNaming();
    countryDataNaming.DBNamed = this.DBNamed;
    countryDataNaming.transformDBToAPINamed();

    this.APINamed = {
      id: this.DBNamed.city_id,
      language: this.DBNamed.city_language,
      name: this.DBNamed.city_name,
      urlName: this.DBNamed.city_url_name,
      country: countryDataNaming.APINamed
    };

    if(isEmptyObject(this.APINamed)) {
      this.APINamed = undefined;
    }
  };
};
