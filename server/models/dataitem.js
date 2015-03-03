'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * DataItem Schema
 */
var DataItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  startdate: {
    type: Date,
    required: true,
    trim: true
  },
  launchdate: {
    type: Date,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},
{
  strict: false
});

/**
 * Validations
 */
 /*
DataItemSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

DataItemSchema.path('date').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

DataItemSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
DataItemSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('DataItem', DataItemSchema);
