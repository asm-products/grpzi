var validator = require('validator'),
    bcrypt = require('bcrypt');

module.exports = function (app, db) {
  // define attributes
  var userSchema = db.Schema({
    username: String,
    password: String,
    email: String
  });

  // validate username
  userSchema.path('username').validate(function (username) {
    return validator.isAlphanumeric(username);
  }, 'invalid_characters');

  // validate email
  userSchema.path('email').validate(function (email) {
    return validator.isEmail(email);
  }, 'invalid');

  // check if username is available
  userSchema.pre('validate', true, function (next, done) {
    next();

    if (!this.isModified('username')) return done();
    
    var doc = this;

    app.models.user.count({username: this.username}, function (err, count) {
      if (err) next(err);

      if (count) {
        doc.invalidate('username', 'already_in_use');
      }

      return done();
    });
  });

  // check if email is in use
  userSchema.pre('validate', true, function (next, done) {
    next();

    if (!this.isModified('email')) return done();
    
    var doc = this;

    app.models.user.count({email: this.email}, function (err, count) {
      if (err) next(err);

      if (count) {
        doc.invalidate('email', 'already_in_use');
      }

      return done();
    });
  });

  // password encrypting
  userSchema.pre('save', true, function (next, done) {
    next();

    if (this.isModified('password')) {
      var self = this;

      bcrypt.hash(this.password, 10, function (err, hash) {
        if (err) done(err);

        self.password = hash;
        done();
      });
    }
  });

  app.models.user = db.model('User', userSchema);
};
