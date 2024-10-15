const express = require("express");
const classController = require("../controllers/classController");
const SubjectRouter = require("./subjectRouter");
const handlerFactory = require("../controllers/haldelFactory");

const ClassRouter = express.Router();

ClassRouter.use("/:classId/subjects", SubjectRouter);
ClassRouter.route("/")
  .get(classController.getAllClass)
  .post(
    handlerFactory.uploadImage,
    handlerFactory.setImage,
    classController.createClass
  );

ClassRouter.route("/:id")
  .get(classController.getOneClass)
  .patch(
    handlerFactory.uploadImage,
    handlerFactory.setImage,
    classController.updateClass
  )
  .delete(classController.deleteClass);

module.exports = ClassRouter;
