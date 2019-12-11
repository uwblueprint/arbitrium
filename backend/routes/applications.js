const express = require('express');

// allows routes to be sent out
const router = express.Router();
const db = require('../mongo.js');

router.get('/', function(req, res){

	//get all unique clinicians
	//treats entire object as a dictionary key
	db.applications.find()
	.then(function(found){
		res.json(found);
	})
	.catch(function(err){
		res.send(err);
	})
});

router.post('/', function(req, res){
	var user = {
		username: "greg",
		password: "insecure",
    email: "gmaxin@uwaterloo.ca"
	}
	db.applications.create(user)

	// status code 201 means created
	.then(function(newSchedule){
		res.status(201).json(newSchedule);
	})
	.catch(function(err){
		res.send(err);
	})
});

module.exports = router
