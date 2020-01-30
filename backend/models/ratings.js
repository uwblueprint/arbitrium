var mongoose = require('mongoose');

var comment = new mongoose.Schema({
	lastReviewed: {
		type: String
	},
	value: {
		type: String
	}
});

var question = new mongoose.Schema({
  id: {
    type: String
  },
  notes: [comment],
	rating: {
		type: Number
	}
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
}, { collection: 'Reviews' });


var Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;
