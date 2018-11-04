let CityDataNaming = require('./City');
let isEmptyObject = require('../../turtlelib/objects/isEmptyObject');

module.exports = function() {

  this.APINamed = undefined;
  this.DBNamed = undefined;

  this.transformDBToAPINamed = function() {

    if (typeof this.DBNamed === 'undefined') {
      return;
    }

    let cityDataNaming = new CityDataNaming();
    cityDataNaming.DBNamed = this.DBNamed;
    cityDataNaming.transformDBToAPINamed();

    this.APINamed = {
      city: cityDataNaming.APINamed,
      user: {
        id: this.DBNamed.user_id
      },
      trip: {
        id: this.DBNamed.trip_id
      },
      rank: this.DBNamed.rank
    };

    if (isEmptyObject(this.APINamed)) {
      this.APINamed = undefined;
    }
  };
};
