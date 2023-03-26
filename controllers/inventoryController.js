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
    
exports.singleItem = (req, res) => {
    knex
      .where({ 'inventories.id': req.params.id })
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
        console.log(data);
        if (!data.length){
            return res.status(404).send(`Record with id: ${req.params.id} is not found`);
        }
        res.status(200).json(data[0]);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving item ${req.params.id} ${err}`)
      );
  };
