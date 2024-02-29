const express = require('express');
const app = express();
const Path = require('path');
require('dotenv').config();

app.use(express.json());
app.use(express.static(Path.join(__dirname, '../dist')));

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));