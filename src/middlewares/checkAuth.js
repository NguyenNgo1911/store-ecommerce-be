const checkAuthenticated = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            throw new Error("Missing Token");
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}

module.exports = { checkAuthenticated };