const express = require("express");
// incude passport 
const passport = require("passport");
// here using of express router 
const router = express.Router();
// include review conttroller 
const reviewController = require('../controllers/review_controller');

// for creating new rweview at this end point 
router.get('/newReview/:id', reviewController.createReview);

module.exports = router;