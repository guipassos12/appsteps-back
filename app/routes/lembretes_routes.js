const ObjectId = require('mongodb').ObjectID;

module.exports = function (app, db) {

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
      const lembrete = { compromisso: req.body.compromisso, 
                         responsavel: req.body.responsavel, 
                         data: req.body.data, 
                         feito: req.body.feito };
  
      db.collection(colName).insert(lembrete, (err, result) => {
        if (err) {
          res.send({ 'error': 'Erro ao inserir lembrete: ' + err });
        } else {
          res.send(result.ops[0]);
        }
      });
    });
  
  
    app.delete('/lembretes/del/:id', (req, res) => {
      db.collection(colName).deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
        if (err) {
          res.send({ 'error': 'Erro ao finalizar lembrete: ' + err });
        } else {
          res.send({'sucess': 'Lembrete finalizado!'});
        }
      });
    });
  
  };