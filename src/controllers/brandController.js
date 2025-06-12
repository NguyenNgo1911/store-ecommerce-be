const BrandModal = require('../models/brandModel')
// Create Brand
const createBrand = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const response = new BrandModal({ name, description, image })
        await response.save();
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
}

// Get List Brand
const getListBrand = async (req, res) => {
    try {
        const response = await BrandModal.find();
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
}

// Get Id Brand
const getBrandById = async (req, res) => {
    try {
        const response = await BrandModal.findById(req.params.id)
        if(!response) {
            return res.status(404).json({ message: "Brand does is not exist" });
        }
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
}

// Update Brand
const updateBrand = async (req, res) => {
    try {
        const response = await BrandModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!response) {
            return res.status(404).json({ message: "Brand does is not exist" });
        }
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

// Delete Brand
const deleteBrand = async (req, res) => {
    try {
        const response = await BrandModal.findByIdAndDelete(req.params.id);
        if(!response) {
            return res.status(404).json({ message: "Brand does is not exist" });
        }
        res.status(200).json({ message: "Delete Success!" });
    } catch (error) {
        return res.status(500).json({ message: "Error System" });
    }
};

module.exports = { createBrand, getListBrand, getBrandById, updateBrand, deleteBrand };
