const express = require('express');

// allows routes to be sent out
const router = express.Router();
const db = require('../mongo.js');
const core = require('cors');
cors = require('cors');

//A list of websites that can access the data for the api calls.(CORS)
var whitelist = ['http://localhost:3000', 'https://decision-io.firebaseapp.com', 'https://decision-io.web.app']
//Include "cors(corsOptions)" to protect the endpoint
//Example: app.get('/api/questions', cors(corsOptions), (req, res) => {
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || true) {
      callback(null, true)
    } else {
      callback(new Error('Access Denied (Cookie Monster)'))
    }
  }
}

router.get('/', cors(corsOptions), function(req, res){

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

router.post('/', cors(corsOptions), function(req, res){
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
