const jwt = require('jsonwebtoken');

const getJwtToken = async (req, res, next) => {
    const token = req.cookies.authCookie;
    
    if (!token) {
        res.clearCookie("authCookie");
        return res.status(401).json({ message: "No token provided!" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userToken = decodedToken;

        next();
    } catch (error) {
        res.clearCookie("authCookie");
        return res.status(403).json({ message: "Invalid token!" });
    }
};

module.exports = getJwtToken;
