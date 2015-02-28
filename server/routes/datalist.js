'use strict';

var datalist = require('../controllers/datalist');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.item.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Articles, app, auth) {

  app.route('/datalist')
    .get(datalist.all)
    .post(auth.requiresLogin, datalist.create);
  app.route('/datalist/:itemid')
    .get(auth.isMongoId, datalist.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, datalist.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, datalist.destroy);

  // Finish with setting up the itemid param
  app.param('itemid', datalist.item);
};
