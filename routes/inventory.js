const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (_req, res) => {
    res.status(200).send(console.log("🔥 GET/inventory Success!"));
});

module.exports = router;