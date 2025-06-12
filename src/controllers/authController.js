const jwt = require('jsonwebtoken');
const AuthModal = require('../models/authModel');

// Helper để tạo JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// Đăng ký người dùng
const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    try {
        // Kiểm tra email đã tồn tại chưa
        const userExists = await AuthModal.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email đã tồn tại!' });
        }

        // Tạo người dùng mới
        const user = await AuthModal.create({ name, email, password });
        res.status(200).json({message: "Đăng ký thành công"});
    } catch (error) {
        res.status(500).json({ message: 'Đăng ký thất bại!', error: error.message });
    }
}

// Đăng nhập người dùng 
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu!' });
    }

    try {
        // Kiểm tra email tồn tại
        const user = await AuthModal.findOne({ email });

        if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
        } else {
            res.status(401).json({ message: 'Email hoặc mật khẩu không đúng!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Đăng nhập thất bại!', error: error.message });
    }
}

module.exports = { register, login };