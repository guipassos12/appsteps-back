module.exports = function (app, db, autoIncrement) {

  const colName = 'luz';

  app.get('/luz', (req, res) => {
    var query = { data: /^ + req.query.ano + /  };
    db.collection(colName).find(query).sort({ data: -1 }).toArray((err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao buscar contas de luz: ' + err });
      } else {
        res.send(result);
      }
    });
  });


  app.post('/luz/add', (req, res) => {
    autoIncrement.getNextSequence(db, colName, (err, autoIndex) => {
      var luz = { _id: autoIndex, valor: req.body.valor, data: req.body.data };

      db.collection(colName).insertOne(luz, (err, result) => {
        if (err) {
          res.send({ 'error': 'Erro ao inserir compra: ' + err });
        } else {
          res.send(luz);
        }
      });
    });
  });


  app.put('/luz/update/:id', (req, res) => {
    var luz = { _id: req.params.id, valor: req.params.valor, data: req.body.data };

    db.collection(colName).updateOne(
      { _id: parseInt(req.params.id) },
      { $set: { valor: req.body.valor, data: req.body.data } },
      (err, result) => {
        if (err) {
          res.send({ 'error': 'Erro ao alterar conta de luz: ' + err });
        } else {
          res.send(luz);
        }
      });
  });


  app.delete('/luz/del/:id', (req, res) => {
    db.collection(colName).deleteOne({ _id: parseInt(req.params.id) }, (err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao finalizar conta de luz: ' + err });
      } else {
        res.send({ 'ok': req.params.id + ' deletado com sucesso' });
      }
    });
  });

};
