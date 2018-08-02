let pgp = require('pg-promise')({
  // Initialization Options
});

let config = require('../config');

let cn = 'postgres://'
     + config.database.username
     + ':' + config.database.password
     + '@' + config.database.host
     + ':' + config.database.port
     + '/' + config.database.schema;

let db = pgp(cn);

module.exports = db;