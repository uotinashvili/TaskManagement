const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], register);

router.post('/login', [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').notEmpty().withMessage('Password is required'),
], login);

module.exports = router;
