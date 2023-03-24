const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const warehouseRoutes = require('./routes/warehouses')
const inventoriesRoutes = require('./routes/inventories');

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors(
    { origin: CLIENT_URL }
));

app.use(express.json());

app.use('/warehouse', warehouseRoutes)
app.use('/inventories', inventoriesRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`);
});