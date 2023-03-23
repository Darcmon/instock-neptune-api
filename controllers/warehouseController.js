const knex = require("knex")(require("../knexfile"));
const {v4: uuid} = require('uuid')

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

exports.addWarehouse = (req, res) => {
    const {warehouseName, warehouseAddress, warehouseCity, warehouseCountry, contactName, contactPosition, contactNumber, contactEmail} = req.body

    if (!warehouseName || !warehouseAddress || !warehouseCity || !warehouseCountry || !contactName || !contactPosition || !contactNumber || !contactEmail) {
        return res.status(400).send('Please make sure to provide all fields');
      }
      const newWarehouse = {
        id: uuid(),
        warehouse_name: warehouseName,
        address: warehouseAddress,
        city: warehouseCity,
        country: warehouseCountry,
        contact_name: contactName,
        contact_position: contactPosition,
        contact_phone: contactNumber,
        contact_email: contactEmail
      }

      knex('warehouses')
      .insert(newWarehouse)
      .then((data)=> {
        const newWarehouseURL = `/warehouse/data${data[0]}`
        res.status(201).location(newWarehouseURL).send(newWarehouseURL);
      })
      .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
}
