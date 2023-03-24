const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'))
const inventoryController = require('../controllers/inventoryController');
const { v4: uuidv4 } = require('uuid');


router.route('/').get(inventoryController.index);
router.route('/:id').get(inventoryController.singleItem);



router
    .route('/')
    .post((req, res) => {
        const { warehouse_id, item_name, description, category, status, quantity } = req.body;
        if (!warehouse_id || !item_name || !description || !category || !status || quantity === undefined) {
            return res.status(400).json({ error: 'Missing properties in the request body' });
        }
        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity)) {
            return res.status(400).json({ error: 'Quantity must be a number' });
        }
        knex('warehouses')
            .where('id', warehouse_id)
            .first()
            .then((warehouseExists) => {
                if (!warehouseExists) {
                    return res.status(400).json({ error: 'The warehouse_id does not exist in the warehouses table' });
                }
                knex('inventories')
                    .insert({
                        id: uuidv4(),
                        warehouse_id,
                        item_name,
                        description,
                        category,
                        status,
                        quantity: parsedQuantity
                    })
                    .then(() => {
                        knex('inventories')
                            .where({
                                warehouse_id,
                                item_name,
                                description,
                                category,
                                status,
                                quantity: parsedQuantity
                            })
                            .first()
                            .then((insertedInventory) => {
                                res.status(201).json(insertedInventory);
                            })
                            .catch((error) => {
                                console.log(error);
                                res.status(500).json({ error: 'Error getting inserted inventory' });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error: 'Error inserting inventory' });
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Error checking warehouse existence' });
            });
    });



module.exports = router;


// const express = require('express');
// const knex = require('knex');
// const router = express.Router();
// const { v4: uuidv4 } = require('uuid');


// // router.get('/', (_req, res) => {
// //     res.status(200).send(console.log("🔥 GET/inventories Success!"));
// // });

// router.route('/')
//     .post(async (req, res) => {
//         const { warehouse_id, item_name, description, category, status, quantity } = req.body;
//         if (!warehouse_id || !item_name || !description || !category || !status || quantity === undefined) {
//             return res.status(400).json({ error: 'Missing properties in the request body' });
//         }
//         const parsedQuantity = Number(quantity);
//         if (isNaN(parsedQuantity)) {
//             return res.status(400).json({ error: 'Quantity must be a number' });
//         }
//         try {
//             const warehouseExists = await knex('warehouses').where('id', warehouse_id).first();
//             if (!warehouseExists) {
//                 return res.status(400).json({ error: 'The warehouse_id does not exist in the warehouses table' });
//             }
//             const [insertedInventory] = await knex('inventories')
//                 .insert({
//                     id: uuidv4(),
//                     warehouse_id,
//                     item_name,
//                     description,
//                     category,
//                     status,
//                     quantity: parsedQuantity
//                 })
//                 .returning('*');
//             res.status(201).json(insertedInventory);
//         } catch (error) {
//             console.log(error);
//             res.status(400).json({ error: 'An error occurred while processing the request' });
//         }
//     });

// module.exports = router;



// router.route('/:id')
//     .put(async (req, res) => {
//         const { warehouse_id, item_name, description, category, status, quantity } = req.body;
//         const id = req.params.id;
//         if (!id || !warehouse_id || !item_name || !description || !category || !status || quantity === undefined) {
//             return res.status(400).json({ error: 'Missing properties in the request body' });
//         }
//         const parsedQuantity = Number(quantity);
//         if (isNaN(parsedQuantity)) {
//             return res.status(400).json({ error: 'Quantity must be a number' });
//         }
//         try {
//             const inventoryExists = await knex('inventories').where('id', id).first();
//             if (!inventoryExists) {
//                 return res.status(404).json({ error: 'Inventory ID not found' });
//             }
//             const warehouseExists = await knex('warehouses').where('id', warehouse_id).first();
//             if (!warehouseExists) {
//                 return res.status(400).json({ error: 'The warehouse_id does not exist in the warehouses table' });
//             }
//             const [updatedInventory] = await knex('inventories')
//                 .where('id', id)
//                 .update({
//                     warehouse_id,
//                     item_name,
//                     description,
//                     category,
//                     status,
//                     quantity: parsedQuantity
//                 })
//                 .returning('*');
//             res.status(200).json(updatedInventory);
//         } catch (error) {
//             console.log(error);
//             res.status(400).json({ error: 'An error occurred while processing the request' });
//         }
//     });

// module.exports = router;


