module.exports = function (app, db) {

  const colName = 'compras';

  app.get('/compras', (req, res) => {
    db.collection(colName).find({}).toArray((err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao buscar compras: ' + err });
      } else {
        res.send(result);
        db.close();
      }
    });
  });


  app.post('/compras/add', (req, res) => {
    const compra = { tipo: req.body.tipo, titulo: req.body.titulo };
    console.log(compra);
    db.collection(colName).insert(compra, (err, result) => {
      if (err) {
        res.send({ 'error': 'Erro ao inserir compra: ' + err });
      } else {
        res.send(result.ops[0]);
        db.close();
      }
    });
  });


  app.delete('/compras/del/:id', (req, res) => {
    const id = req.params.id;
    const compra = { '_id': new ObjectID(id) };

    db.collection('notes').remove(compra, (err, item) => {
      if (err) {
        res.send({ 'error': 'Erro ao finalizar compra: ' + err });
      } else {
        res.send('Compra ' + id + ' finalizada!');
      }
    });
  });

};