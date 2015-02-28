'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  DataItem = mongoose.model('DataItem'),
  _ = require('lodash');


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
  var item = new DataItem(req.body);
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

  item = _.extend(item, req.body);

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
