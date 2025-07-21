const { body, validationResult } = require('express-validator'); 
const CategoryModel = require('../models/categoryModel')
const BrandModel = require('../models/brandModel')

const validateProduct = [
    body('name')
        .optional()
        .notEmpty().withMessage('name is not empty')
        .isString().withMessage('name must be string'),

    body('description')
        .isString().withMessage('description must be a string'),

    body('image')
        .optional()
        .notEmpty().withMessage('image is not empty')
        .isURL().withMessage('image must be a valid URL'),

    body('quantity')
        .optional()
        .notEmpty().withMessage('quantity is not empty')
        .isInt({ min: 1 }).withMessage('quantity must be a positive integer'),

    body('price')
        .optional()
        .notEmpty().withMessage('price is not empty')
        .isInt({ min: 1000 }).withMessage('price min is 1000'),

    body('promotion_price')
        .optional()
        .notEmpty().withMessage('promotion_price is not empty')
        .isInt({ min: 0 }).withMessage('promotion_price min is 0'),
    
    body('category')
        .optional()
        .notEmpty().withMessage('category is not empty')
        .custom(async (value) => {
            await CategoryModel.findById(value); 
            return true;
        }),

    body('brand')
        .optional()
        .notEmpty().withMessage('brand is not empty')
        .custom(async (value) => {
            await BrandModel.findById(value); 
            return true;
        }),

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

module.exports = validateProduct ;
