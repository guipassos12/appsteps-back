const comprasRoutes = require('./compras_routes');
const lembretesRoutes = require('./lembretes_routes');

module.exports = function(app, db) {
  comprasRoutes(app, db);
  lembretesRoutes(app, db);
};