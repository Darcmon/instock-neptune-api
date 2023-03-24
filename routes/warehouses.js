const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'))
const warehouseController = require('../controllers/warehouseController');

router.route('/').get(warehouseController.index);
router.route('/:id').get(warehouseController.specificWarehouse);


router.route('/add').post(warehouseController.addWarehouse)
router.route('/:id').patch(warehouseController.editWarehouse)
router.route('/:id').delete(warehouseController.deleteWarehouse)

module.exports = router;