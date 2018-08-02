exports.up = function(knex, KnexPromise) {
  return knex.schema.createTable('translated_city', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('city_id').unsigned().references('id').inTable('city');
    table.text('name').notNull();
    table.text('url_name').notNull();
    table.text('language').notNull();
  });
};

exports.down = function(knex, KnexPromise) {
  return knex.schema.dropTableIfExists('translated_city');
};