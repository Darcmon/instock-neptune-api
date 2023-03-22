const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
  knex
    .select(
      "id",
      "item_name",
      "description",
      "category",
      "status",
      "quantity"
    )
    .from("inventories")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};
