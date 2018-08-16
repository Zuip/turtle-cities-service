exports.up = function(knex, KnexPromise) {
  return knex.schema.createTable('comparison', function(table) {
    table.integer('city_id').unsigned().references('id').inTable('city').primary();
    table.integer('user_id').unsigned().notNull().primary();
    table.integer('trip_id').unsigned().notNull().primary();
    table.integer('rank').unsigned().notNull();
  });
};

exports.down = function(knex, KnexPromise) {
  return knex.schema.dropTableIfExists('comparison');
};