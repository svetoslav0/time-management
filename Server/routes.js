const router = require("express").Router();

const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const projectController = require("./controllers/projectController");

router.use("/", authController);
router.use("/users", userController);
router.use("/projects", projectController);
module.exports = router;
