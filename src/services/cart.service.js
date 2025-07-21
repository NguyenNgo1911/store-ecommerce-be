const Cart = require('../models/cartModel');
const { sendResponse } = require('../utils/sendResponse')

const getCartService = async (req) => {
    const userId = req?.user?._id;
    const itemsCart = await Cart.findOne({ user: userId }).populate('items.product', 'items.quantity')
    return itemsCart;
}

const addToCartService = async (req) => {
    const userId = req?.user?._id;
    const { product_id, quantity } = req?.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({
            user: userId, 
            items: [
                {
                    product: product_id, 
                    quantity: quantity
                }
            ]
        });
    } else {
        const itemIndex = cart.items.findIndex(item => item.product && item.product.toString() === product_id);
        
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: product_id, quantity: quantity});
        }

        await cart.save();
    }

    return cart
}

const updateCartService = async (req, res) => {
    const userId = req?.user?._id;
    const { product_id, quantity } = req?.body;
    
    let cart = await Cart.findOne({ user: userId });

    if(!cart){
        return sendResponse(res, {
            statusCode: 404,
            status: false,
            message: "Cart not found",
        })
    }
    
    const itemIndex = cart.items.find(item => item.product === product_id);

    if (!itemIndex) {
      return sendResponse(res, {
        statusCode: 404,
        status: false,
        message: 'Product not found in cart'
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    return cart

}

module.exports = { getCartService, addToCartService, updateCartService };