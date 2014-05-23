var validator = require('validator'),
    bcrypt = require('bcrypt');

module.exports = function (app, db) {
  app.post('/user', function (req, res, next) {
    // check if we have all required parameters and get rid of anything else
    var errors = app.helpers.onlyNeed(req, ['username', 'email', 'password']);

    // missing parameters, throw an error straight away
    if (errors.length > 0)
      return app.errors.params(res, errors);

    var errors = [];
    // check if username is allowed
    if (!validator.isAlphanumeric(req.body.username))
      errors.push({field: 'username', error: 'invalid_characters'});

    // check if email is valid
    if (!validator.isEmail(req.body.email))
      errors.push({field: email, error: 'invalid'});

    // throw validation errors
    if (errors.length > 0)
      return app.errors.params(res, errors);

    // check availability of username
    app.models.user.count({username: req.body.username}, function (err, count) {
      if (err) return next(err);

      if (count)
        errors.push({field: 'username', error: 'already_in_use'});

      // check if email is already in use
      app.models.user.count({email: req.body.email}, function (err, count) {
        if (err) return next(err);

        if (count)
          errors.push({field: 'email', error: 'already_in_use'});

        // throw in use errors
        if (errors.length > 0)
          return app.errors.params(res, errors);

        // everything is valid, encrypt password
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        app.models.user.create(req.body, function (err, user) {
          if (err) return next(err);

          // dont show password & output user data
          app.helpers.shield(req.body, ['password']);
          res.json(req.body);
        });
      })
    });
  });
};
