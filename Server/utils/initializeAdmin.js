const User = require("../models/User");

const initializeAdmin = async () => {
  try {
    const adminUser = await User.findOne({ userRole: "admin" });

    if (!adminUser) {
      const adminUserData = {
        email: "admin@example.com",
        firstName: "admin",
        lastName: "admin",
        password: "admin123",
        userRole: "admin",
      };

      await User.create(adminUserData);

      console.log("Admin user created!");
    } else {
      console.log("Admin user already exists!");
    }
  } catch (error) {
    console.error("Error initializing admin:", error);
  }
};

module.exports = initializeAdmin;
