const { body, validationResult } = require('express-validator'); 
const ProductModal = require('../models/productModel');

const validateCart = [
    body('product_id')
        .optional()
        .notEmpty().withMessage('product_id is not empty')
        .isString().withMessage('product_id must be string')
        .custom(async (value) => {
            await ProductModal.findById(value);
            return true
        }),
             
    body('quantity')
        .optional()
        .notEmpty().withMessage('quantity is not empty')
        .isInt({ min: 1 }).withMessage('quantity must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const formattedErrors = errors.array().map(err => ({
                msg: err.msg,
                value: err.value
            }));
            return res.status(400).json({ errors: formattedErrors });
        }
        next();
    }
];

module.exports = validateCart ;