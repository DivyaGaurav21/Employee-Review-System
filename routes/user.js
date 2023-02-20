const express = require('express');
const passport = require('passport');

// using express route 
const router = express.Router();
// include userController function 
const userController = require('../controllers/user_controller')
// route for login request end point 
router.use('/login', userController.login);
// route for register  request end point
router.get('/register', userController.register);
// route for logout  request end point
router.get('/logout', userController.destroySession);
// route for create user in db request end point
router.post('/create-user', userController.createUser);
// route for creating session  request end point after checking user is authenticating 
router.post('/create-session',
    passport.authenticate(
        'local',
        { failureRedirect: '/users/login' }
    ) , userController.createSession);

module.exports = router;