const router = require("express").Router();

const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const projectController = require("./controllers/projectController");
const hoursController = require("./controllers/hoursController");

router.use("/", authController);
router.use("/hours", hoursController);
router.use("/users", userController);
router.use("/projects", projectController);
module.exports = router;
