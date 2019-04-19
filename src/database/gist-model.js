'use strict';

const MongoModel = require('./mongomodel.js');
const schema = require('./gist-schema.js');

/** 
 * Class representing a Gist.
 * @extends MongoModel
 */
class Gist extends MongoModel {}

const gist = new Gist(schema);

module.exports = gist; 
