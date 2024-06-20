const jwt = require("jsonwebtoken");

const userService = require("../services/userService");

const isAdmin = async (req, res, next) => {
    const token = req.cookies.authCookie;
    
    if (!token) {
        return res.status(401).json({ message: "No token provided!" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.getSingleUser(decodedToken._id);

        if (!user || user.userRole !== "admin") {
            return res.status(401).json({ message: "unauthorized" });
        }

        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token!" });
    }
};

module.exports = isAdmin;
