const express = require("express");
const chapterController = require("../controllers/chapterController");
const ChapterRouter = express.Router({ mergeParams: true });

ChapterRouter.route("/")
  .get(chapterController.getAllChapters)
  .post(
    chapterController.uploadPdf,
    chapterController.setUnitId,
    chapterController.setPdf,
    chapterController.createChapter
  );

ChapterRouter.route("/:id")
  .get(chapterController.getOneChapter)
  .patch(
    chapterController.uploadPdf,
    chapterController.setPdf,
    chapterController.updateChapter
  )
  .delete(chapterController.deleteChapter);

module.exports = ChapterRouter;
