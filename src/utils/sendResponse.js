const sendResponse = (res, {statusCode = 200 , status = false, message = "", data }) => {
    const response = {
        code: statusCode, 
        status: status, 
        message: message, 
    }
    if (data !== undefined) response.data = data;

    res.status(statusCode).json({response})
}
module.exports = { sendResponse };