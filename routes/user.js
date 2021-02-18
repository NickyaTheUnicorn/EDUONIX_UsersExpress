/**
 * user.js is the contains the api's routes to manipulate the users data
 * Author: Renner Yannick
 * Created On: 02.17.2021
 */
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/:id', userController.user_detail);
router.post('/register', [
    check('email', 'Email is invalid').isEmail().normalizeEmail(),
    check('password', 'Password must be at least 6 characater and less than 20').isLength({min: 6, max: 20}),
], userController.user_register);

module.exports = router



