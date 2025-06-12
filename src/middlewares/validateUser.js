const { body, validationResult } = require('express-validator');

const validateUser = [
    body('name')
        .notEmpty().withMessage('name: không được để trống')
        .isString().withMessage('name: phải là chuỗi'),

    body('description')
        .optional()
        .isString().withMessage('description: phải là chuỗi'),

    body('age')
        .notEmpty().withMessage('age: không được để trống')
        .isInt({ min: 0 }).withMessage('age: phải là số nguyên dương'),

    body('avatar')
        .optional()
        .isURL().withMessage('avatar: phải là một URL hợp lệ'),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                msg: err.msg,
                value: err.value
            }));
            return res.status(400).json({ errors: formattedErrors });
        }
        next();
    }
];

module.exports = validateUser;
