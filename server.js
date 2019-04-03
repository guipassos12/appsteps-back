const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const autoIncrement = require('mongodb-autoincrement');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/db');

const app = express();
app.use(cors());

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(db.url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)

    app.listen(port, () => {
        console.log('Ligado na porta: ' + port);
    });

    app.get('/alive', function (req, res) {
        res.send("{'res': 'Tamo ai na atividade'}");
    });

    const database = client.db("appstepsdb");

    require('./app/routes')(app, database, autoIncrement);

});
