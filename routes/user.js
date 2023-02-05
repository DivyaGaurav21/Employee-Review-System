const express = require('express');
const passport = require('passport');


const router = express.Router();

const userController = require('../controllers/user_controller')

router.use('/login', userController.login);
router.get('/register', userController.register);

router.get('/logout', userController.destroySession);

router.post('/create-user', userController.createUser);

router.post('/create-session',
    passport.authenticate(
        'local',
        { failureRedirect: '/users/sign-in' }
    ) , userController.createSession);

module.exports = router;