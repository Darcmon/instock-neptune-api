const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'))
const warehouseController = require('../controllers/warehouseController');

router.route('/').get(warehouseController.index);


router.get('/', (_req, res) => {
    res.status(200).send(console.log("🔥 GET/warehouses Success!"));
});

router.route('/add').post(warehouseController.addWarehouse)

// router.post('/add', (req, res) => {
//     console.log(req.body);
//     const {warehouseName, warehouseAddress, warehouseCity, warehouseCountry, contactName, contactPosition, contactNumber, contactEmail} = req.body
//     res.status(200).send('Inside the post')
// })

module.exports = router;