exports.up = function (knex) {
  return knex.schema.createTable("plants", function (table) {
    table.increments("id").primary();
    table.string("plantName");
    table.string("ownerId");
    table.string("owner");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("plants");
};
