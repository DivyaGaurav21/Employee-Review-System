const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller')

router.use('/login', userController.login);

module.exports = router;