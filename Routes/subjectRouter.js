const express = require("express");
const subjectController = require("../controllers/subjectController");
const UnitRouter = require("./unitRoute");
const handlerFactory = require("../controllers/haldelFactory");

const SubjectRouter = express.Router({ mergeParams: true });
SubjectRouter.use("/:subjectId/units", UnitRouter);

SubjectRouter.route("/")
  .post(
    handlerFactory.uploadImage,
    handlerFactory.setImage,
    subjectController.setClassId,
    subjectController.createSubject
  )
  .get(subjectController.getAllSubject);

SubjectRouter.route("/:id")
  .get(subjectController.getOneSubject)
  .patch(
    handlerFactory.uploadImage,
    handlerFactory.setImage,
    subjectController.updateSubject
  )
  .delete(subjectController.deleteSubject);

module.exports = SubjectRouter;
