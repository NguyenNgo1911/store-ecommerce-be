const express = require('express');
const { createBrand, getListBrand, getBrandById, updateBrand, deleteBrand } = require('../controllers/brandController');
const { checkAuthenticated } = require('../middlewares/checkAuth');

const router = express.Router();

// Router API 
router.post('/brand', checkAuthenticated, createBrand);
router.put('/brand/:id', checkAuthenticated, updateBrand);
router.delete('/brand/:id', checkAuthenticated, deleteBrand);
router.get('/brand/:id', getBrandById);
router.get('/brand', getListBrand);

module.exports = router;