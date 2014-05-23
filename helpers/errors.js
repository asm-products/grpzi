var url = require('url');

module.exports = function(app) {
  app.errors = {};

  // not found
  app.use(function(req, res, next) {
    app.errors.notfound(req, res);
  });

  app.errors.notfound = function(req, res) {
    res.status(404);

    return res.json({message: 'Not found'});
  }

  // server errors
  // full error while developing
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        
        return res.json({message: err.message, error: err});
    });
  }

  // production errors
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      
      return res.json({message: "An error occured", error: true});
  });
};
