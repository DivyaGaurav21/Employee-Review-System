const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');
router.get('/', userController.home);

router.use('/users', require('./user'));

module.exports = router;