var mongoose = require('mongoose');

var Schema = mongoose.Schema; 

var feedbackSchema = new Schema (
    {   
        _id: mongoose.Schema.Types.ObjectId,

        userId: {
            type: String, 
            required: true 
        },

            // bad // okay // good // null
        expierence: { 
            type: String,  
            default: ''
        }, 
            // bug // suggession // other // null
        feedbackPar: { 
            type: String,  
            default: ''
        }, 
    
        comment: { 
            type: String,  
            default: ''
        } 
    });

// Model is a constructor for the Schema
var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback; 