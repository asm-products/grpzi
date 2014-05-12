module.exports = function (app, db) {
  app.models = {};

  // all models should be required here
  require('../models/user')(app, db);
};
