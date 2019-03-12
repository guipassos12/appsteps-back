const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./db/db');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


MongoClient.connect(db.url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    
    app.listen(port, () => {
        console.log('Ligado na porta: ' + port);
    });

    app.get('/', function (req, res) {
        res.send("Tamo ai na atividade");
    });

    const database = client.db("appstepsdb");

    require('./app/routes')(app, database);
    //client.close();
});

/*
app.listen(port, () => {
    console.log('Ligado na porta: ' + port);
});

require('./app/routes')(app, {});
app.get('/', function (req, res) {
    res.send("Tamo ai na atividade");
});*/