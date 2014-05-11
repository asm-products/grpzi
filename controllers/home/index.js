module.exports = function (app) {
  app.get('/', function(req, res, next) {
    return res.render('home/index');
  });
};
