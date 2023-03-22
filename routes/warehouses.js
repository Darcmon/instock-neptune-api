const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'))

router
.route('/')
    .get((req, res) => {
        knex
            .select('*')
            .from('warehouses')
            .then((data) => {
                res.status(200)
                res.send(data)
            })
            .catch((error) => {
                res.status(400)
                console.log(error);
            })
})

router.get('/', (_req, res) => {
    res.status(200).send(console.log("🔥 GET/warehouses Success!"));
});

module.exports = router;