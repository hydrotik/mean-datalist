'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  DataItem = mongoose.model('DataItem'),
  _ = require('lodash'),
  path = require('path');

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
  var data = _.pick(req.body, 'type'), 
      uploadPath = path.normalize('./packages/custom/datalist/public/upload'),
      files = req.files;
      // file = req.files.file

console.log(files);
  console.log(data);
  //console.log(file.name); //original name (ie: sunset.png)
  //console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
  console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)





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

