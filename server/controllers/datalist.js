'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  DataItem = mongoose.model('DataItem'),
  _ = require('lodash'),
  fse = require('fs-extra'),
  path = require('path'),
  pdftohtml = require('pdftohtmljs'),
  cheerio = require('cheerio'),
  config = require('meanio').loadConfig(),
  junk = require('junk'),
  _ = require('highland'),
  Datalist = require('../lib/datalist-node.js');

/**
 * Find item by id
 */
exports.item = function(req, res, next, id) {
  DataItem.load(id, function(err, item) {
    if (err) return next(err);
    if (!item) return next(new Error('Failed to load item ' + id));
    req.item = item;
    next();
  });
};

/**
 * Create an item
 */
exports.create = function(req, res) {
  var item = new DataItem(req.body, false);
  item.user = req.user;

  item.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the item'
      });
    }
    res.json(item);

  });
};




/**
 * Update an item
 */
exports.update = function(req, res) {
  var item = req.item;
  // Doesn't really work when items are not in the schema!
  item = _.extend(item, req.body);
  // Need this for schemaless keys not in the model
  for (var key in req.body){
    if(!DataItem.schema.tree.hasOwnProperty(key)) item.set(key, req.body[key]);
  }

  item.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the item'
      });
    }
    res.json(item);

  });
};

/**
 * Delete an item
 */
exports.destroy = function(req, res) {
  var item = req.item;

  item.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the item'
      });
    }
    res.json(item);

  });
};

/**
 * Show an item
 */
exports.show = function(req, res) {
  /*
  var obj = {
    item : req.item,
    tree : DataItemSchemaTree
  };
  */
  res.json(req.item);
};

/**
 * List of DataItems
 */
exports.all = function(req, res) {
  DataItem.find().sort('-created').populate('user', 'name username').exec(function(err, items) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the items'
      });
    }
    /*
    var obj = {
      items : items,
      tree : DataItemSchemaTree
    };
    */
    res.json(items);

  });
};


exports.upload = function(req, res) {
  console.log('server upload()');
  var file = req.files.file;
  var objid = mongoose.Types.ObjectId();
  file.objid = objid;
  file.extension = path.extname(file.name);
  
  var tmpfile = './' + file.path;
  var destdir = config.root + '/packages/custom/datalist/public/assets/uploads';
  var destfile = objid + file.extension;


  // https://www.npmjs.com/package/fs-extra
  fse.ensureDir(destdir, function(err) {
    if(err) return console.log(err); // => null 

    //Make sure the directory exists
    fse.copy(tmpfile, destdir + '/' + destfile, function(err) {
      if (err) return console.error(err);

      // Remove tmp file
      fse.remove('./' + file.path, function(err) {
        if (err) return console.error(err);

        // If file is PDF then let's create an HTML preview
        if(file.extension === '.pdf'){

          var p = 0;

          // Poll for exisiting file
          var fileInterval = setInterval(function(){

            console.log('checking for pdf...');

            //Check existance of PDF in destination directory
            fse.exists(destdir + '/' + destfile, function(exists) {
              console.log(exists);
              if(exists){
                // Clear Polling Interval
                clearInterval(fileInterval);

                console.log('PDF is located at: ' + destdir + '/' + destfile); // => null

                // Start PDF Conversion process
                var converter = new pdftohtml(destdir, destfile, objid + '.html', {});
                converter.preset('sanitized_styling');

                converter.success(function() {
                  res.json(file);
                  console.log('pdf file upload success!');
                });

                converter.error(function(error) {
                  console.log('conversion error: ' + error);
                });

                converter.progress(function(ret) {
                  console.log ((ret.current*100.0)/ret.total + ' %');
                });
                converter.convert();
              }else{
                console.log('PDF not copied yet: ' + err); // => null
                p = p + 1;

                if(p === 15){
                  clearInterval(fileInterval);
                  console.log('upload success but PDF can not be found. Cancelling HTML preview creation.'); // => null
                  res.json(file);
                }
              }
            });
          }, 100);
        }else{
          res.json(file);
          console.log('file upload success!');
        }
        
      });
    });
  });
};



function processNode(_p, f) {
    var s = fse.statSync(path.join(_p, f));
    return {
        'id': path.join(_p, f),
        'text': f,
        'icon': s.isDirectory() ? 'jstree-custom-folder' : 'jstree-custom-file',
        'state': {
            'opened': false,
            'disabled': false,
            'selected': false
        },
        'li_attr': {
            'base': path.join(_p, f),
            'isLeaf': !s.isDirectory()
        },
        'children': s.isDirectory(),
        'contextmenu' : {
          items : { // Could be a function that should return an object like this one
              'create' : {
                  'separator_before'  : false,
                  'separator_after'   : true,
                  'label'             : 'Create',
                  'action'            : false,
                  'submenu' :{
                      'create_file' : {
                          'seperator_before' : false,
                          'seperator_after' : false,
                          'label' : 'File',
                          action : function (obj) {
                              this.create(obj, 'last', {'attr' : {'rel' : 'default'}});
                          }
                      },
                      'create_folder' : {
                          'seperator_before' : false,
                          'seperator_after' : false,
                          'label' : 'Folder',
                          action : function (obj) {                               
                              this.create(obj, 'last', {'attr' : { 'rel' : 'folder'}});
                          }
                      }
                  }
              }
          }
      }
    };
}

function processReq(_p, res) {
    var resp = [];
    fse.readdir(_p, function(err, list) {
      var l = Datalist.removeDuplicateFile(list.filter(junk.not), '.html');
        for (var i = l.length - 1; i >= 0; i = i - 1) {
            resp.push(processNode(_p, l[i]));
        }
        res.json(resp);
    });
}

exports.tree = function(req, res) {
  var _p;
  console.log(req.query.id);
    if (parseInt(req.query.id) === 1) {
      _p = path.resolve(__dirname, '../..', 'public/assets');
      processReq(_p, res);

    } else {
      if (req.query.id) {
        _p = req.query.id;
        console.log('id not 1: ' + _p);
        processReq(_p, res);
      } else {
        res.json(['No valid data found']);
      }
    }
};

exports.resource = function(req, res) {
  //console.log(req.query);

  var extension = path.extname(req.query.resource);
  var filename = path.basename(req.query.resource, extension);
  var dir = path.dirname(req.query.resource);

  var output = '';

  if(extension === '.pdf'){
    var $ = cheerio.load(fse.readFileSync(dir + '/' + filename + '.html', 'UTF-8'));
    output = $('body').html();
  }else{
    output = fse.readFileSync(req.query.resource, 'UTF-8');
  }

  res.send(output);
  
};