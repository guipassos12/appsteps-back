const ObjectId = require('mongodb').ObjectID;

module.exports = function (app, db) {

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
    const compra = { titulo: req.body.titulo };
    db.collection(colName).insert(compra, (err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao inserir compra: ' + err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });


  app.delete('/compras/del/:id', (req, res) => {
    const id = req.params.id;
    const compra = { '_id': new ObjectId(id) };

    db.collection('notes').deleteOne(compra, (err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao finalizar compra: ' + err });
      } else {
        console.log(result);
        res.send('Compra finalizada com sucesso');
      }
    });
  });

};