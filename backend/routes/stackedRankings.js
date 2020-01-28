const express = require('express');

// allows routes to be sent out
const router = express.Router();
const db = require('../mongo.js');

router.get('/', function(req, res){

	db.stackings.find()
	.then(function(found){
		res.json(found);
	})
	.catch(function(err){
		res.send(err);
	})
});

router.post('/', function(req, res){
	var rating = {
		applicationId: res.applicationId,
    userId: res.userId,
    rating: res.rating
	}
	db.stackings.create(rating)

	// status code 201 means created
	.then(function(newSchedule){
		res.status(201).json(newSchedule);
	})
	.catch(function(err){
		res.send(err);
	})
});

module.exports = router
