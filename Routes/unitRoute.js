const express = require("express");
const unitController = require("../controllers/unitController");
const ChapterRouter = require("./chapterRoute");

const UnitRouter = express.Router({ mergeParams: true });

UnitRouter.use("/:unitId/chapters", ChapterRouter);

UnitRouter.route("/")
  .post(unitController.setSubjectId, unitController.createUnit)
  .get(unitController.getAllUnits);

UnitRouter.route("/:id")
  .get(unitController.getOneUnit)
  .patch(unitController.updateUnit)
  .delete(unitController.deleteUnit);

module.exports = UnitRouter;
