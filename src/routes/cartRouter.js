const express = require('express');
const { checkAuthenticated } = require('../middlewares/checkAuth');
const { addToCart, getCart, updateCart } = require('../controllers/cartController');
const { authorizeRole } = require('../middlewares/checkRole')
const validateCart = require('../middlewares/validateCart')

const router = express.Router();

// Router API 
router.get("/cart", checkAuthenticated, authorizeRole("admin",'user'), getCart)
router.post("/cart", checkAuthenticated, validateCart ,authorizeRole("admin",'user'), addToCart)
router.put("/cart", checkAuthenticated, validateCart ,authorizeRole("admin",'user'), updateCart)

module.exports = router;