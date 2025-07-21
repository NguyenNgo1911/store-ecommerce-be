const { sendResponse } = require("../utils/sendResponse")

const authorizeRole = (...roleList) => {
    return (req, res, next) => {
        if(!req.user || !roleList.includes(req.user.role)) {
            return sendResponse(res, {
                statusCode: 403,
                status: false,
                message: 'Forbidden: You do not have permission.'
            });
        }
        next()
    }
}
module.exports = { authorizeRole };