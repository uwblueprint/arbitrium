var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    groups: {
        type: Array
    },
}, { collection: 'user' });


var User = mongoose.model('user', userSchema);

module.exports = User;