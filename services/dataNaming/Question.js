let isEmptyObject = require('../../turtlelib/objects/isEmptyObject');

module.exports = function() {

  this.APINamed = undefined;
  this.DBNamed = undefined;

  this.transformDBToAPINamed = function() {

    if (typeof this.DBNamed === 'undefined') {
      return;
    }

    this.APINamed = {
      id: this.DBNamed.question_id,
      text: this.DBNamed.question_text
    };

    if (isEmptyObject(this.APINamed)) {
      this.APINamed = undefined;
    }
  };
};
