const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
  knex
    .select(
      "inventories.id",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity",
      'warehouses.warehouse_name'
    )
    .from("inventories")
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};

exports.deleteItem = (req, res) => {
    knex('inventories')
    //   .delete()
      .where({ id: req.params.id })
      .then(() => {
        res.status(204).send(`Warehouse with id: ${req.params.id} has been deleted`);
      })
      .catch((err) =>
        res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
      );
  };
