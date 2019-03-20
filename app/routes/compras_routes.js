const ObjectId = require('mongodb').ObjectID;

module.exports = function (app, db, autoIncrement) {

  const colName = 'compras';

  app.get('/compras', (req, res) => {
    db.collection(colName).find({}).toArray((err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao buscar compras: ' + err });
      } else {
        res.send(result);
      }
    });
  });


  app.post('/compras/add', (req, res) => {

    autoIncrement.getNextSequence(db, collectionName, (err, autoIndex) => {
      const compra = { _id: autoIndex, titulo: req.body.titulo };
      db.collection(colName).insert(compra, (err, result) => {
        if (err) {
          res.send({ 'error': 'Erro ao inserir compra: ' + err });
        } else {
          res.send(compra);
        }
      });
    });
  });


  app.delete('/compras/del/:id', (req, res) => {
    db.collection(colName).deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao finalizar compra: ' + err });
      } else {
        db.collection(colName).find({}).toArray((err, result) => {
          if (err) {
            res.send({ 'error': 'Erro ao buscar compras apos deletar: ' + err });
          } else {
            res.send(result);
          }
        });
      }
    });
  });

};
