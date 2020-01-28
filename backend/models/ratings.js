var mongoose = require('mongoose');

//We will only read from applications so we don't need to define a schema



var comment = new mongoose.Schema({
	lastReviewed: {
		type: String
	},
	value: {
		type: String
	}
});

var question = new mongoose.Schema({
  questionId: {
    type: String
  },
  notes: [comment],
	lastReviewed: {
		type: String
	},
});

var reviewSchema = new mongoose.Schema({
  applicationId: {
		type: String
	},
	userId: {
		type: String
	},
	rating: {
		type: Number
	},
  comments: [comment],
  lastReviewed: {
    type: String
  },
  questionList: [question]
}, { collection: 'Ratings' });


var Ratings = mongoose.model('Ratings', reviewSchema);

module.exports = Ratings;
