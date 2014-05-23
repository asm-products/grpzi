module.exports = function (app) {
  app.helpers = {};

  // credits to @pksunkara for most of this

  // only allow supplied params
  app.helpers.permit = function (req, fields) {
    req.oldBody = req.body;
    req.body = {};

    fields.forEach(function (field) {
      if (req.oldBody[field]) {
        req.body[field] = req.oldBody[field];
      }
    });
  };

  // make sure all the params we need are there
  app.helpers.need = function (req, fields) {
    var errors = [];

    fields.forEach(function (field) {
      if (req.body[field] === undefined) {
        errors.push({ field: field, code: 'missing' });
      }
    });

    return errors;
  }

  // combine permit & need
  app.helpers.onlyNeed = function (req, fields) {
    app.helpers.permit(req, fields);
    return app.helpers.need(req, fields);
  }

  // get rid of supplied params
  app.helpers.shield = function (body, fields) {
    fields.forEach(function (field) {
      if (body[field]) delete body[field];
    });
  }
};
