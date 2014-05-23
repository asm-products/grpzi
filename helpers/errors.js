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

  // output errors in request parameters
  app.errors.params = function (res, errors) {
    res.status(422);
    return res.json({message: 'Invalid parameters', errors: errors});
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
