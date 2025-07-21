const express = require('express');
const { createCategory, getListCategorys, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { checkAuthenticated } = require('../middlewares/checkAuth');
const { authorizeRole } = require('../middlewares/checkRole')
const router = express.Router();

// Router API 
router.post('/category', checkAuthenticated, authorizeRole("admin"), createCategory);
router.put('/category/:id', checkAuthenticated, authorizeRole("admin"), updateCategory);
router.delete('/category/:id', checkAuthenticated, authorizeRole("admin"), deleteCategory);
router.get('/category/:id', authorizeRole("admin", "user"), getCategoryById);
router.get('/category', authorizeRole("admin", "user"), getListCategorys);

module.exports = router;
