const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'))
const inventoryController = require('../controllers/inventoryController');

router.route('/').get(inventoryController.index);
router
.route('/:id')
.delete(inventoryController.deleteItem);

router.get('/', (_req, res) => {
    res.status(200).send(console.log("🔥 GET/inventories Success!"));
});

module.exports = router;