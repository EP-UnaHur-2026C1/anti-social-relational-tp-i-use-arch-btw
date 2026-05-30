const express = require('express');
const app = express();
const db = require('../models');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, async () => {
    await db.sequelize.sync();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
