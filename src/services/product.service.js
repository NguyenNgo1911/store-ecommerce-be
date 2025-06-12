const CategoryModel = require('../models/categoryModel')
const BrandModel = require('../models/brandModel')
const ProductModel = require('../models/productModel')

const createProductService = async (req) => {
    const { name, description, image, quantity, category_id, brand_id, price, promotion_price } = req.body;
    // Kiểm tra id category tồn tại
    const categoryId = await CategoryModel.findById(category_id);
    const brandId = await BrandModel.findById(brand_id);
    if (!categoryId) {
        throw new Error("Category does not exist");
    }
    if(!brandId) {
        throw new Error("Brand does not exist");
    }
    const response = new ProductModel({ name, description, image, quantity, category_id, brand_id, price, promotion_price });
    return await response.save();
}

module.exports = { createProductService }