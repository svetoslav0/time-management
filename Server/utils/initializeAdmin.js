const User = require("../models/User");

const initializeAdmin = async () => {
    try {
        const adminUser = await User.findOne({ userRole: "admin" });

        if (!adminUser) {
            const adminUserData = {
                username: "admin",
                firstName: "admin",
                lastName: "admin",
                password: "admin123",
                userRole: "admin",
            };

            const createdAdmin = await User.create(adminUserData);

            console.log("Admin user created");
        } else {
            console.log("Admin user already exists");
        }
    } catch (error) {
        console.error("Error initializing admin:", error);
    }
};

module.exports = initializeAdmin;
