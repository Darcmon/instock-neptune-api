const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const inventoriesRoutes = require('./routes/inventories');
const warehousesRoutes = require('./routes/warehouses');

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors(
    {origin: CLIENT_URL}
));

app.use(express.json());

app.get('/', (_req, res) => {
    res.status(200).send(console.log("🔥 GET Success!"));
});

app.use('/inventories', inventoriesRoutes);
app.use('/warehouses', warehousesRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`);
});