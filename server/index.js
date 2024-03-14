const express = require('express');
const morgan = require('morgan');
const Path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(express.static(Path.join(__dirname, '../dist')));

app.listen(process.env.PORT, '0.0.0.0', () => console.log(`Server listening on port ${process.env.PORT}`));
