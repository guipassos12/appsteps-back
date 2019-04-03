module.exports = function (app, db, autoIncrement) {

  const colName = 'lembretes';

  app.get('/lembretes', (req, res) => {
    db.collection(colName).find({}).toArray((err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao buscar lembretes: ' + err });
      } else {
        res.send(result);
      }
    });
  });


  app.post('/lembretes/add', (req, res) => {
    autoIncrement.getNextSequence(db, colName, (err, autoIndex) => {
      var lembrete = {
        _id: autoIndex,
        compromisso: req.body.compromisso,
        responsavel: req.body.responsavel,
        data: req.body.data,
        feito: req.body.feito
      };

      db.collection(colName).insertOne(lembrete, (err, result) => {
        if (err) {
          res.send({ 'error': 'Erro ao inserir lembrete: ' + err });
        } else {
          res.send(lembrete);
        }
      });
    });
  });


  app.put('/lembretes/update/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var newVal = { $set: { compromisso: req.body.compromisso, responsavel: req.body.responsavel, data: req.body.data, } };
    var lembrete = {
      _id: req.params.id,
      compromisso: req.body.compromisso,
      responsavel: req.body.responsavel,
      data: req.body.data
    };

    db.collection(colName).updateOne(id, newVal, (err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao alterar lembrete: ' + err });
      } else {
        res.send(lembrete);
      }
    });
  });


  app.delete('/lembretes/del/:id', (req, res) => {
    db.collection(colName).deleteOne({ _id: parseInt(req.params.id) }, (err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao finalizar lembrete: ' + err });
      } else {
        res.send({ 'ok': req.params.id + ' deletado com sucesso' });
      }
    });
  });

};