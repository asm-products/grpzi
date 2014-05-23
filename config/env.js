module.exports = function(app) {

  // basic env
  app.set('env', process.env.NODE_ENV || 'development');
  app.set('port', process.env.PORT || 3000);

  // base url
  app.set('baseurl', process.env.BASE_URL || 'http://localhost:' + app.get('port'));
};
