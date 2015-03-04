'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


// https://www.npmjs.com/package/angoose



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
    trim: true,
    fieldenabled : true,
    fieldlabel : 'Title',
    fieldtype : 'text'
  },
  startdate: {
    type: Date,
    required: true,
    trim: true,
    fieldenabled : true,
    fieldlabel : 'Start Date',
    fieldtype : 'date'
  },
  launchdate: {
    type: Date,
    required: true,
    trim: true,
    fieldenabled : true,
    fieldlabel : 'Launch Date',
    fieldtype : 'date'
  },
  content: {
    type: String,
    required: true,
    trim: true,
    fieldenabled : true,
    fieldlabel : 'Content',
    fieldtype : 'textarea'
  },
  description: {
    type: String,
    required: true,
    trim: true,
    fieldenabled : true,
    fieldlabel : 'Description',
    fieldtype : 'textarea'
  },
  superhere: {
    type: String,
    required: true,
    trim: true,
    fieldenabled : true,
    fieldlabel : 'Super Hero',
    fieldtype : 'text'
  },
  updated : [],
  
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
