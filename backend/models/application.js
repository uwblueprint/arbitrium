var mongoose = require('mongoose');

//We will only read from applications so we don't need to define a schema

var appSchema = new mongoose.Schema({
}, { collection: 'Applications' });


//var App = mongoose.model('Application', appSchema);
module.exports = appSchema
