const express = require('express');
const validateProductPayload = require('../middlewares/validateProduct')
const { createProducts, getListProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { checkAuthenticated } = require('../middlewares/checkAuth');

const router = express.Router();

// Router API 
router.delete('/product/:id', checkAuthenticated, deleteProduct);
router.post('/product', checkAuthenticated, validateProductPayload, createProducts);
router.put('/product/:id', checkAuthenticated, validateProductPayload , updateProduct);
router.get('/product/:id', getProductById);
router.get('/product', getListProducts);

module.exports = router;
