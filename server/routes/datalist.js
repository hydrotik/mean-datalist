'use strict';

var datalist = require('../controllers/datalist');
var flow = require('../lib/flow-node.js')('tmp');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


var ACCESS_CONTROLL_ALLOW_ORIGIN = true;

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

  app.post('/upload', multipartMiddleware, function(req, res) {
    flow.post(req, function(status, filename, original_filename, identifier) {
      console.log('POST', status, original_filename, identifier);
      if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
        res.header('Access-Control-Allow-Origin', '*');
      }
      res.status(status).send();
    });
  });

  app.options('/upload', function(req, res){
    console.log('OPTIONS');
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header('Access-Control-Allow-Origin', '*');
    }
    res.status(200).send();
  });

  // Handle status checks on chunks through Flow.js
  app.get('/upload', function(req, res) {
    flow.get(req, function(status, filename, original_filename, identifier) {
      console.log('GET', status);
      if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
        res.header('Access-Control-Allow-Origin', '*');
      }

      if (status === 'found') {
        status = 200;
      } else {
        status = 404;
      }

      res.status(status).send();
    });
  });

  app.get('/download/:identifier', function(req, res) {
    flow.write(req.params.identifier, res);
  });
};
