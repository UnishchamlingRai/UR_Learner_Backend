const express = require("express");
const userController = require("../controllers/userController");
const UserRouter = express.Router();

UserRouter.route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);
UserRouter.route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = UserRouter;
