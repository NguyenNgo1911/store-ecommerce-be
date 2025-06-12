const ProductModel = require('../models/productModel')
const { createProductService } = require('../services/product.service')

// Create Product
const createProducts = async (req, res) => {
    try {
        const response = await createProductService(req);
        res.status(200).json(response);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";

        return res.status(statusCode).json({ message });
    }
}

// Get List Products
const getListProducts = async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;

        const total = await ProductModel.countDocuments();

        // filter search by name
        const { name, category_id, brand_id } = req.query;
        let query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' };
            // $regex tìm tên có chứa từ khóa, k phân biệt hoa/thường
        }
        if (category_id) {
            query = { "category": category_id };
        }
        if (brand_id) {
            query = { "brand": brand_id };
        }
        const response = await ProductModel
            .find(query)
            .populate("category", "name _id")
            .populate("brand", "name _id")
            .sort({ promotion_price: -1 })
            .skip(offset)
            .limit(limit)
            .exec();
        res.status(200).json({total, offset, limit, data: response});
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

// Get Detail Product
const getProductById = async (req, res) => {
    try {
        const response = await ProductModel.findById(req.params.id);
        if (!response) {
            return res.status(404).json({ message: "Product does not exist" });
        }
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const response = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!response) {
            return res.status(404).json({ message: "Product does not exist" });
        }
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

// Delete Product 
const deleteProduct = async (req, res) => {
    try {
        const response = await ProductModel.findByIdAndDelete(req.params.id);
        if(!response) {
            return res.status(404).json({ message: "Product does not exist" });
        }
        res.status(200).json({ message: "Delete Success!" });
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

module.exports = { createProducts, getListProducts, getProductById, updateProduct, deleteProduct };