const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { checkAuthenticated } = require('../middlewares/checkAuth');
const validateUser = require('../middlewares/validateUser');
const router = express.Router();

// Router API 
router.post('/users', validateUser, checkAuthenticated, createUser);
router.put('/users/:id', validateUser, checkAuthenticated, updateUser);
router.delete('/users/:id', checkAuthenticated, deleteUser);
router.get('/users/:id', getUserById);
router.get('/users', getAllUsers);

module.exports = router;
