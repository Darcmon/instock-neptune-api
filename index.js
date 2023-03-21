const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors(
    {origin: CLIENT_URL}
));

app.use(express.json());

app.get('/', (_req, res) => {
    res.send(console.log("🔥 GET Success!"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`);
});