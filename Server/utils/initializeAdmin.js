const User = require("../models/User");
const { Role } = require("../models/Roles");

const initializeAdmin = async () => {
    try {
        const adminRole = await Role.findOne({ name: "admin" });

        if (!adminRole) {
            throw new Error("Admin role does not exist");
        }

        const adminUser = await User.findOne({ userRole: adminRole._id });

        if (!adminUser) {
            const adminUserData = {
                username: "admin",
                firstName: "admin",
                lastName: "admin",
                password: "admin123",
                userRole: adminRole._id,
            };

            const createdAdmin = await User.create(adminUserData);

            await Role.updateOne(
                { _id: adminRole._id },
                { $push: { userRef: createdAdmin._id } }
            );

            console.log("Admin user created");
        } else {
            console.log("Admin user already exists");
        }
    } catch (error) {
        console.error("Error initializing admin:", error);
    }
};

module.exports = initializeAdmin;
