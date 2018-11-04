exports.up = function(knex, KnexPromise) {
  return knex.schema.createTable('translated_question', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('question_id').unsigned().references('id').inTable('question');
    table.text('text').notNull();
    table.text('language').notNull();
  });
};

exports.down = function(knex, KnexPromise) {
  return knex.schema.dropTableIfExists('translated_question');
};
