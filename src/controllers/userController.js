const UserModal = require('../models/userModel');

// Tạo người dùng mới
const createUser = async (req, res) => {
    try {
        const { email, password ,name, description, age, avatar } = req.body;
        const newUser = new UserModal({ email, password, name, description, age, avatar });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

// Lấy danh sách người dùng
const getAllUsers = async (req, res) => {
    try {
        //filter search by name
        const { name } = req.query;
        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        const users = await UserModal.find(query).select("-password");
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        res.status(200).json(user).select("-password");;
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    try {
        const user = await UserModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        res.status(200).json(user).select("-password");;
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    try {
        const user = await UserModal.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        res.status(200).json({ message: "Xóa người dùng thành công!" });
    } catch (error) {
        return res.status(500).json({ message: "Đã có lỗi từ hệ thống" });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser};
