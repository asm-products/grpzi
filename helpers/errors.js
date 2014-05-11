var url = require('url');

module.exports = function(app) {
  app.errors = {};

  // determine if api
  app.use(function(req, res, next) {
    req.isAPI = url.parse(req.url).pathname.substr(0, 4) == '/api';

    next();
  });

  // not found
  app.use(function(req, res, next) {
    app.errors.notfound(req, res);
  });

  app.errors.notfound = function(req, res) {
    res.status(404);

    if (req.isAPI)
      return res.json({message: 'Not found'});
    
    res.render('errors/notfound');
  }

  // server errors
  // full error while developing
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        
        if (req.isAPI)
          return res.json({message: err.message, error: err});
        
        res.render('errors/error', {message: err.message, error: err});
    });
  }

  // production errors
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      
      if (req.isAPI)
        return res.json({message: "An error occured", error: true});
      
      res.render('errors/error', {message: "Something went wrong!", error: false});
  });
};
