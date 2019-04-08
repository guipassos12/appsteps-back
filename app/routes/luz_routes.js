module.exports = function (app, db, autoIncrement) {

  const colName = 'luz';

  app.get('/luz', (req, res) => {
    db.collection(colName).find({ "data": { $regex: ".*" + req.query.ano + ".*" } }).sort({ data: -1 }).toArray((err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao buscar contas de luz: ' + err });
      } else {
        res.send(result);
      }
    });
  });


  app.post('/luz/add', (req, res) => {
    db.collection(colName).find({ "data": req.body.data }).limit(1).count().toArray((err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao buscar contas de luz: ' + err });
      } else if (result > 0) {
        res.send({ 'error': 'Já existe uma conta para esse mês' });
      } else {
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
      }
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
