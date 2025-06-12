const express = require('express');
const { createProducts, getListProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { checkAuthenticated } = require('../middlewares/checkAuth');

const router = express.Router();

// Router API 
router.post('/product', checkAuthenticated, createProducts);
router.put('/product/:id', checkAuthenticated, updateProduct);
router.delete('/product/:id', checkAuthenticated, deleteProduct);
router.get('/product/:id', getProductById);
router.get('/product', getListProducts);

module.exports = router;
