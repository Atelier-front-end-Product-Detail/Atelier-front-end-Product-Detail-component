const express = require('express');
const app = express();
const Path = require('path');
const morgan = require('morgan')
require('dotenv').config();
const axios = require('axios')

app.use(express.json());
app.use(express.static(Path.join(__dirname, '../dist')));
app.use(morgan('dev'))

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));

