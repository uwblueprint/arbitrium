var mongoose = require('mongoose');

//We will only read from applications so we don't need to define a schema

var ratingSchema = new mongoose.Schema({
  applicationId: {
		type: String
	},
	userId: {
		type: String
	},
	rating: {
		type: number
	}
}, { collection: 'Ratings' });


var Ratings = mongoose.model('Ratings', ratingSchema);

module.exports = Ratings;
