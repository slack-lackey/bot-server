'use strict';

const MongoModel = require('./mongomodel.js');
const schema = require('./gist-schema.js');

class Gist extends MongoModel {}

const gist = new Gist(schema);

module.exports = gist; 
