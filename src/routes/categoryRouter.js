const express = require('express');
const { createCategory, getListCategorys, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { checkAuthenticated } = require('../middlewares/checkAuth');
const router = express.Router();

// Router API 
router.post('/category', checkAuthenticated, createCategory);
router.put('/category/:id', checkAuthenticated, updateCategory);
router.delete('/category/:id', checkAuthenticated, deleteCategory);
router.get('/category/:id', getCategoryById);
router.get('/category', getListCategorys);

module.exports = router;
