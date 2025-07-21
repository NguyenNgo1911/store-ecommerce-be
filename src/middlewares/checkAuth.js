const { sendResponse } = require("../utils/sendResponse")
const jwt = require('jsonwebtoken');
const AuthModel = require('../models/authModel')

const checkAuthenticated = async (req, res, next) => {
    try {
        const auth = req.headers["authorization"]
        if (!auth || !auth.startsWith('Bearer ')) {
            return sendResponse(res, { statusCode: 401, status: false, message: "Unauthorized"})
        }
        const token = auth?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await AuthModel.findById(decoded.id);
        if (!user) {
            return sendResponse(res, { statusCode: 401, status: false, message: "User do not exist!"})
        }
        req.user = user;

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = { checkAuthenticated };