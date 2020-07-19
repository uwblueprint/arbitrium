var mongoose = require('mongoose');

//We will only read from applications so we don't need to define a schema

var appSchema = new mongoose.Schema({
}, { collection: 'Applications' });

module.exports = appSchema
