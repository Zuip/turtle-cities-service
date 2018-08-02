exports.up = function(knex, KnexPromise) {
  return knex.schema.createTable('city', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('country_id').unsigned().references('id').inTable('country');
  });
};

exports.down = function(knex, KnexPromise) {
  return knex.schema.dropTableIfExists('city');
};