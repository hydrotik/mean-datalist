'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  DataItem = mongoose.model('DataItem'),
  _ = require('lodash'),
  fse = require('fs-extra'),
  path = require('path'),
  localconfig = require('../config/all.js'),
  globalconfig = require('meanio').loadConfig(),
  cheerio = require('cheerio'),
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
    res.json(items);
  });
};

/**
 * Upload Files
 */
exports.upload = function(req, res) {
  console.log('server upload()');

  Datalist.uploadFile(req, function(file){
    res.json(file);
  });
};

/**
 * jsTree Data
 */
exports.tree = function(req, res) {
  var _p;
  console.log(req.query.id);
    if (parseInt(req.query.id) === 1) {
      _p = globalconfig.root + localconfig.assetsdir; 
      Datalist.processReq(_p, res);

    } else {
      if (req.query.id) {
        _p = req.query.id;
        console.log('id not 1: ' + _p);
        Datalist.processReq(_p, res);
      } else {
        res.json(['No valid data found']);
      }
    }
};

/**
 * Load Resource
 */
exports.resource = function(req, res) {
  //console.log(req.query);

  var extension = path.extname(req.query.resource);
  var filename = path.basename(req.query.resource, extension);
  var dir = path.dirname(req.query.resource);

  var output = '';

  if(extension === '.pdf'){
    var $ = cheerio.load(fse.readFileSync(dir + '/' + filename + '.html', 'UTF-8'));
    //var $css = $('style');
    var $dom = $('body');
    $dom.find('img').remove();
    output = $dom.html();
  }else{
    output = fse.readFileSync(req.query.resource, 'UTF-8');
  }

  res.send(output);
  
};