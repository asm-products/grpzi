module.exports = function (app) {
  app.errors = {};

  // catch unhandled requests
  app.use(function (req, res, next) {
    app.errors.notfound(req, res);
  });

  // output 404
  app.errors.notfound = function (req, res) {
    res.status(404);
    return res.json({message: 'Not found'});
  }

  // output validation errors
  app.errors.validation = function (res, errors) {
    res.status(422);

    var output = [];

    for (var key in errors) {
      if (errors[key].path) {
        output.push({field: errors[key].path, message: errors[key].message});
      } else
      {
        output.push(errors[key]);
      }
    }

    return res.json({message: 'validation_failed', errors: output});
  }

  // server errors
  // full error while developing
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        
        return res.json({message: err.message, error: err});
    });
  }

  // production errors
  app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      
      return res.json({message: 'An error occured', error: true});
  });
};
