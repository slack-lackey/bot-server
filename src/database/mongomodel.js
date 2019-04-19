'use strict';
/**
 * MongoDB — Creates the mongo model base.
 * Used when a value is added to the database.
 * @module src/database/mongomodel.js
 */

/**The template mongo database model for the bot to store data.
 * @class MongoModel
 * @param  {} schema
 * @returns {} returns a template for the the model
 */
class MongoModel {
  constructor(schema){
    this.schema = schema;
  }
  get(_id){
    return this.schema.find(_id);
  }
  post(record){
    if(!record){return null;}
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
}
module.exports = MongoModel;
