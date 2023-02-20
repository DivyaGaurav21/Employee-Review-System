// use mongoose library for mongodb database 
const mongoose = require('mongoose');

// making a review schema 
const reviewSchema = new mongoose.Schema({

    review: {
        type: String,
        required: true,
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    reviewed: {  // recieved review from another people
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true,
});
// review model for exporting 
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;