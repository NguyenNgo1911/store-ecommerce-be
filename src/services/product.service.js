const ProductModel = require('../models/productModel')

const createProductService = async (req) => {
    const { name, description, image, quantity, category, brand, price, promotion_price } = req.body;
    
    const response = new ProductModel({name, description, image, quantity, category, brand, price, promotion_price });
    return await response.save();
}

const getListProductsService = async (req) => {
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
    const response = await ProductModel.find(query).populate("category", "name _id").populate("brand", "name _id").sort({ promotion_price: -1 }).skip(offset).limit(limit).exec();
    return {offset, limit, data:response, total}
}

const getProductByIdService = async (id) => {
    const response = await ProductModel.findById(id).lean();
    return response
}

const updateProductByIdService = async (req) => {
    const response = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true}).lean()
    return response
}

const deleteProductByIdService = async (id) => {
    const response = await ProductModel.findByIdAndDelete(id)
    return response
}

module.exports = { createProductService, getListProductsService, getProductByIdService, updateProductByIdService, deleteProductByIdService }