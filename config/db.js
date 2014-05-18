module.exports = function (app, db) {
  app.set ('db', process.env.MONGOHQ_URL || process.env.DB_URL || 'mongodb://localhost/grpzi');

  db.connect(app.get('db'));

  db.connection.on('error', console.error.bind(console, 'Error while connecting to Mongo:'));

  db.connection.once('open', function () {
    require('./schema')(app, db);
  });
};
