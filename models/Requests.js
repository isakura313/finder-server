const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  headers: {type: Types.ObjectId}
});

module.exports = model('Requests', schema);