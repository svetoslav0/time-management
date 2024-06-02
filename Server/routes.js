const router = require("express").Router();

const userController = require("./controllers/userController");
const projectController = require("./controllers/projectController")

router.use("/users", userController);
router.use("/projects", projectController)
module.exports = router;
