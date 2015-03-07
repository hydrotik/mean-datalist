'use strict';

var datalist = require('../controllers/datalist');
var flow = require('../lib/flow-node.js')('./packages/custom/datalist/public/tmp/');
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart();
var fs = require('fs');
//var multer  = require('multer');


//var ACCESS_CONTROLL_ALLOW_ORIGIN = true;

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

// https://github.com/mick26/ng_Node-AdvancedFileUpload




  app.post('/api/upload', function(req, res){
    flow.post(req, function(status, filename, original_filename, identifier, currentTestChunk, numberOfChunks) {
          console.log('POST', status, original_filename, identifier);
          res.send(200);
          if (status === 'done' && currentTestChunk > numberOfChunks) {
              var stream = fs.createWriteStream('./public/upload/' + filename);
              //EDIT: I removed options {end: true} because it isn't needed
              //and added {onDone: flow.clean} to remove the chunks after writing
              //the file.
              flow.write(identifier, stream, { onDone: flow.clean });            
          }            
      });

  });



// Handle cross-domain requests
// NOTE: Uncomment this funciton to enable cross-domain request.
/*
  app.options('/upload', function(req, res){
  console.log('OPTIONS');
  res.send(true, {
  'Access-Control-Allow-Origin': '*'
  }, 200);
  });
*/

// Handle status checks on chunks through Flow.js
app.get('/api/upload', function(req, res){
  flow.get(req, function(status, filename, original_filename, identifier){
    console.log('GET', status);
    //res.send(200, (status === 'found' ? 200 : 404));
    res.status(200).sendStatus((status === 'found' ? 200 : 404));
  });
});




};
