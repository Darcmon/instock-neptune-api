const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'))
const warehouseController = require('../controllers/warehouseController');

router.route('/').get(warehouseController.index);


router.get('/', (_req, res) => {
    res.status(200).send(console.log("🔥 GET/warehouses Success!"));
});

module.exports = router;