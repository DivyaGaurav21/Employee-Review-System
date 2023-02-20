const express = require('express');
// here i use express route 
const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

// after checking authentication simply call the home controller at this end point 
router.get('/', passport.checkAuthentication , userController.home);

// use user route 
router.use('/users', require('./user'));
// use admin route 
router.use('/admin', require('./admin'));
// use review route 
router.use('/reviews', require('./review'));

module.exports = router;