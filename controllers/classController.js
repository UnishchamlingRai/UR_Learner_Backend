const Classes = require("../models/classModel");
const handlerFactory = require("./haldelFactory");

exports.createClass = handlerFactory.create(Classes, "class");
exports.getAllClass = handlerFactory.getAll(Classes, "classes");
exports.getOneClass = handlerFactory.getOne(Classes, "class");
exports.deleteClass = handlerFactory.deleteOne(Classes, "class");
exports.updateClass = handlerFactory.updateOne(Classes, "class");
