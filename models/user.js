module.exports = function (app, db) {
  var userSchema = db.Schema({
    username: String,
    password: String,
    email: String
  });

  app.models.user = db.model('User', userSchema);
};
