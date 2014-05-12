module.exports = function (app, db) {
  require('./env')(app);
  require('./db')(app, db);
};
