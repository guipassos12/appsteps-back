const comprasRoutes = require('./compras_routes');
const lembretesRoutes = require('./lembretes_routes');
const luzRoutes = require('./luz_routes');

module.exports = function(app, db, autoIncrement) {
  comprasRoutes(app, db, autoIncrement);
  lembretesRoutes(app, db, autoIncrement);
  luzRoutes(app, db, autoIncrement);
};