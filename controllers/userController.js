const User = require("../models/userModel");
const handlerFactory = require("./haldelFactory");

exports.createUser = handlerFactory.create(User, "User");
exports.getAllUsers = handlerFactory.getAll(User, "Users");
exports.getOneUser = handlerFactory.getOne(User, "User");
exports.deleteUser = handlerFactory.deleteOne(User, "User");
exports.updateUser = handlerFactory.updateOne(User, "User");
