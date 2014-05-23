module.exports = function (app, db) {
  app.post('/user', function (req, res, next) {
    // check if we have all required parameters and get rid of anything else
    var errors = app.helpers.onlyNeed(req, ['username', 'email', 'password']);

    // missing parameters, throw an error straight away
    if (errors.length > 0)
      return app.errors.params(res, errors);

    app.models.user.create(req.body, function (err, user) {
      if (err)
        return app.errors.validation(res, err.errors);

      app.helpers.shield(req.body, ['password']);
      res.json(req.body);
    });
  });
};
