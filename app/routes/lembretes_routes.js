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
      const lembrete = { compromisso: req.body.compromisso, responsavel: req.body.responsavel, data: req.body.data, feito: req.body.feito };
  
      db.collection(colName).insert(lembrete, (err, result) => {
        if (err) {
          res.send({ 'error': 'Erro ao inserir lembrete: ' + err });
        } else {
          res.send(result.ops[0]);
        }
      });
    });
  
  
    app.delete('/lembretes/del/:id', (req, res) => {
      const id = req.params.id;
      const lembrete = { '_id': new ObjectID(id) };
  
      db.collection('notes').remove(lembrete, (err, item) => {
        if (err) {
          res.send({ 'error': 'Erro ao finalizar lembrete: ' + err });
        } else {
          res.send('Lembrete ' + id + ' finalizada!');
        }
      });
    });
  
  };