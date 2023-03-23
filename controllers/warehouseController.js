const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
    knex
        .select(
            "warehouses.id",
            "warehouses.warehouse_name",
            "warehouses.address",
            "warehouses.city",
            "warehouses.country",
            "warehouses.contact_name",
            "warehouses.contact_phone",
            "warehouses.contact_email"
        )
        .from("warehouses")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).send(`Error retrieving: ${error}`)
        }
        );
};
