import { body, validationResult } from 'express-validator';

const validateRegistration = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .escape(),
    body('email')
        .trim()
        .isEmail().withMessage('Please include a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }
        next();
    }
];

const validateLogin = [
    body('email')
        .trim()
        .isEmail().withMessage('Please include a valid email')
        .normalizeEmail(),
    body('password')
        .exists().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }
        next();
    }
];

export { validateRegistration, validateLogin };
