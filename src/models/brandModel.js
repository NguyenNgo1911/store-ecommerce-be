const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 255},
    image: { type: String, required: true, maxLength: 255},
    description: { type: String, default: "", maxLength: 255},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now,},
})
module.exports = mongoose.model("Brand", BrandSchema);