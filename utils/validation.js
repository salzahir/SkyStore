const { body } = require('express-validator');
const validForm = [
    body('username')
        .notEmpty().withMessage('Username is required'),

    body('name')
        .notEmpty().withMessage('Name is required'),

    body('email')
        .isEmail().withMessage('Email is not valid'),

    body('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),

    body('passwordConfirmation')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),

    body('terms')
        .equals('on').withMessage('You must accept the terms and conditions')
];

module.exports = { validForm };