const router = require("express").Router();

const userService = require("../services/userService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const { items, total } = await userService.getUsers(req);

    res.status(200).json({ total, items });
  } catch (error) {
    next(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const user = await userService.createUser(req);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", getJwtToken, async (req, res, next) => {
  try {
    const user = await userService.getSingleUser(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", getJwtToken, async (req, res, next) => {
  try {
    const user = await userService.editUser(req);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/:userId/archive", isAdmin, async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserStatus(req, "inactive");
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/password_restore", getJwtToken, async (req, res, next) => {
  try {
    await userService.restorePassword(req);

    res.status(200).send({ message: "Password restored successfully!" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:userId/unarchive", isAdmin, async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserStatus(req, "active");

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/validate_email/:email", async (req, res, next) => {
  try {
    const exists = await userService.isUserExisting(req.params.email);

    return res.status(200).json({ isExisting: !!exists });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
