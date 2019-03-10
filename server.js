const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const port = 3000;

const app = express();

app.listen(port, () => {
    console.log('cheguei na porta: ' + port);
});