const mongoose = require('mongoose');

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


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;