const { sendResponse } = require('../utils/sendResponse')
const { getCartService, addToCartService, updateCartService } = require('../services/cart.service')

const getCart = async (req, res, next) => {
  try {
    const response = await getCartService(req);
    if (!response || !response.items || response.items.length === 0) {
      return sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Success',
        data: []
      });
    } 

    return sendResponse(res, {
      statusCode: 200,
      status: true,
      message: 'Success',
      data: response.items
    });

  } catch(error) {
    next(error)
  }
}

const addToCart = async(req, res, next) => {
  try {
    const response = await addToCartService(req)
    if(response) {
      return sendResponse(res, { 
        statusCode: 200, 
        status: true, 
        message: 'Success', 
        data: response 
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateCart = async(req, res, next) => {
  try{
    const response = await updateCartService(req, res)
    if(response) {
      return sendResponse(res, { 
        statusCode: 200, 
        status: true, 
        message: 'Success', 
        data: response 
      });
    }

  } catch(error){
    next(error)
  }
}

module.exports = { addToCart, getCart, updateCart };