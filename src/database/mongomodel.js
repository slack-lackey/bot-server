'use strict';

class MongoModel {
  constructor(schema){
    this.schema = schema;
  }
  get(_id){
    return this.schema.find(_id);
  }
  post(record){
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
}
module.exports = MongoModel;
