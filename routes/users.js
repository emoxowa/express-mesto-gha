const usersRouter = require("express").Router();

const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/me", getUser);
usersRouter.get("/:userId", getUserById);
usersRouter.patch("/me", updateUser);
usersRouter.patch("/me/avatar", updateUserAvatar);

module.exports = usersRouter;
