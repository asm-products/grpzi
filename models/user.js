module.exports = function (app, db) {
  var userSchema = db.Schema({
    username: String
  });

  app.models.user = db.model('User', userSchema);
};
