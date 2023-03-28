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
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(204).send(`Item with id: ${req.params.id} has been deleted.`);
    })
    .catch((err) =>
      res.status(404).send(`Item with id ${req.params.id} is not found.`)
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
      if (!data.length) {
        return res.status(404).send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving item ${req.params.id} ${err}`)
    );
};


exports.updateInventory = (req, res) => {
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;
  const id = req.params.id;

  // Check for missing properties in the request body
  if (!id || !warehouse_id || !item_name || !description || !category || !status || quantity === undefined) {
    return res.status(400).json({ error: 'Missing properties in the request body' });
  }

  // Check if quantity is a valid number
  const parsedQuantity = Number(quantity);
  if (isNaN(parsedQuantity)) {
    return res.status(400).json({ error: 'Quantity must be a number' });
  }

  knex('inventories')
    .where('id', id)
    .update({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity: parsedQuantity
    })
    .then(() => {
      knex('inventories')
        .where('id', id)
        .first()
        .then((updatedInventory) => {
          res.status(200).json(updatedInventory);
        })
        .catch((err) =>
          res.status(400).json({ error: `Error getting updated inventory item ${id}: ${err}` })
        );
    })
    .catch((err) =>
      res.status(400).json({ error: `Error updating inventory item ${id}: ${err}` })
    );
};

module.exports = exports;

