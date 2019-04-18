'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const gists = mongoose.Schema({
  title: {type:String, required: true},
  author: {type:String, required: true},
  date: {type:String, required: true},
  channel: {type:String, required: true},
  keywords: {type:Array, required: false},
  user: {type:String, required: true},
  url: {type:String, required: true},
});

module.exports = mongoose.model('gists', gists);