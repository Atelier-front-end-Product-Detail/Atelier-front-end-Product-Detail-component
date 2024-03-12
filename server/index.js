const express = require('express');
const morgan = require('morgan');
const Path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(express.static(Path.join(__dirname, '../dist')));

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
