exports.up = function(knex, KnexPromise) {
  return knex.schema.createTable('question', function(table) {
    table.increments('id').unsigned().primary();
  });
};

exports.down = function(knex, KnexPromise) {
  return knex.schema.dropTableIfExists('question');
};