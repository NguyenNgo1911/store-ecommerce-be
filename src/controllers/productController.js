const mongoose = require('mongoose');
const { 
    createProductService, 
    getListProductsService, 
    getProductByIdService, 
    updateProductByIdService, 
    deleteProductByIdService 
} = require('../services/product.service')
const { sendResponse } = require('../utils/sendResponse')

// Create Product
const createProducts = async (req, res, next) => {
    try {
        const response = await createProductService(req);
        if(response) {
            return sendResponse(res, { statusCode: 200, status: true, message: "Create Product Success", data: response })
        }
    } catch (error) {
        next(error);
    }
}

// Get List Products
const getListProducts = async (req, res, next) => {
    try {
        const response = await getListProductsService(req)
        if(response){
            return sendResponse(res, { statusCode: 200, status: true, message:"Success", data: response })
        }
    } catch (error) {
        next(error);
    }
};

// Get Detail Product
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, { statusCode: 400, status: false, message: "ID is lacking in characters or incorrect format" })
        }
        const response = await getProductByIdService(id);
        if(response) {
            return sendResponse(res, { statusCode: 200, status: true, message: "Success", data: response })
        }
    } catch (error) {
        next(error);
    }
};

// Update Product
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, { statusCode: 400, status: false, message: "ID is lacking in characters or incorrect format" })
        }
        const response = await updateProductByIdService(req);
        if(response) {
            return sendResponse(res, { statusCode: 200, status: true, message: "Update Product Success", data: response })
        }
    } catch (error) {
        next(error);
    }
};

// Delete Product 
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return sendResponse(res, { statusCode: 400, status: false, message: "ID is lacking in characters or incorrect format" })
    }
    const response = await deleteProductByIdService(id);
    if(response) {
        return sendResponse(res, { statusCode: 200, status: true, message: "Deleted Success"})
    } else {
        return sendResponse(res, { statusCode: 400, status: false, message: `ID is not found ${id}`, status: false })
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createProducts, getListProducts, getProductById, updateProduct, deleteProduct };