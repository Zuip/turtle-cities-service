
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('city', function(table){
      table.string('latitude');
      table.string('longitude');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('city', function(table){
      table.dropColumn('latitude');
      table.dropColumn('longitude');
    })
  ]);
};
