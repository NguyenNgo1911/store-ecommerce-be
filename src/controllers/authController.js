const jwt = require('jsonwebtoken');
const AuthModal = require('../models/authModel');
const { sendResponse } = require("../utils/sendResponse")

// Helper để tạo JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// Đăng ký người dùng
const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return sendResponse(res, { statusCode: 400, status: false, message: "Infomation is not empty!"})
    }

    try {
        // Kiểm tra email đã tồn tại chưa
        const userExists = await AuthModal.findOne({ email });
        if (userExists) {
            return sendResponse(res, { statusCode: 400, status: false, message: "Email already exists!"})
        }

        // Tạo người dùng mới
        await AuthModal.create({ name, email, password })
        return sendResponse(res, { statusCode: 200, status: true, message: "Register successful!"})
        
    } catch (error) {
        next(error)
    }
}

// Đăng nhập người dùng 
const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendResponse(res, { statusCode: 400, status: false, message: "Email and Password is not empty!"})
    }

    try {
        // Kiểm tra email tồn tại
        const user = await AuthModal.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({token: generateToken(user._id)})
        } else {
            return sendResponse(res, { statusCode: 401, status: false, message: "Email or Password incorrect!"})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login };