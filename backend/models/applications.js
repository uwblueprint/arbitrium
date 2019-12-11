var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
}, { collection: 'users' });


var User = mongoose.model('User', userSchema);

module.exports = User;
