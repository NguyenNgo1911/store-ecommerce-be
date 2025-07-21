const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: { type: String, maxLength: 255, required: true },
    image: { type: String, maxLength: 255, required: true },
    quantity: { type: Number, default: 0, required: true },
    description: { type: String, default: "", maxLength: 255 },
    price: { type: Number, default: 1000 ,required: true },
    promotion_price: { type: Number, default: 0, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now,},
})
module.exports = mongoose.model("Product", ProductsSchema);