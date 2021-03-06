exports.up = function(knex, KnexPromise) {
  return knex.schema.createTable('comparison', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('city_id').unsigned().references('id').inTable('city');
    table.integer('user_id').unsigned().notNull();
    table.integer('trip_id').unsigned().notNull();
    table.integer('rank').unsigned().notNull();
  });
};

exports.down = function(knex, KnexPromise) {
  return knex.schema.dropTableIfExists('comparison');
};
