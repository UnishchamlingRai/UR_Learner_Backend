const Chapter = require("../models/chapterModel");
const handlerFactory = require("./haldelFactory");
const multer = require("multer");

exports.setUnitId = (req, res, next) => {
  if (!req.body.unit) {
    req.body.unit = req.params.unitId;
  }
  next();
};
exports.setPdf = (req, res, next) => {
  // if (req.file) req.body.pdf = req.file.filename;
  if (req.file) req.body.pdf = req.file.filename;
  next();
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/pdfFile");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
  } else {
    cb(new Error("Not an PDF! Please upload only PDF."), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadPdf = upload.single("pdf");

exports.createChapter = handlerFactory.create(Chapter, "Chapter");
exports.getAllChapters = handlerFactory.getAll(Chapter, "Chapters");
exports.getOneChapter = handlerFactory.getOne(Chapter, "Chapter");
exports.deleteChapter = handlerFactory.deleteOne(Chapter, "Chapter");
exports.updateChapter = handlerFactory.updateOne(Chapter, "Chapter");

// exports.createChapter = async (req, res) => {
//   if (req.file) req.body.pdf = req.file.filename;
//   console.log(req.file);
//   req.body.unit = req.params.unitId;
//   const chapter = await Chapter.create(req.body);
//   res.status(200).json({
//     status: "success",
//     data: {
//       chapter: chapter,
//     },
//   });
// };

// exports.getAllChapters = async (req, res) => {
//   console.log(req.params);
//   const chapters = await Chapter.find({ unit: req.params.unitId });
//   res.status(200).json({
//     status: "success",
//     data: {
//       chapters: chapters,
//     },
//   });
// };

// exports.getOneChapter = async (req, res) => {
//   const chapter = await Chapter.findById(req.params.chapterId);
//   res.status(200).json({
//     status: "success",
//     data: {
//       chapter: chapter,
//     },
//   });
// };

// exports.updateChapter = async (req, res) => {
//   const chapter = await Chapter.findByIdAndUpdate(
//     req.params.chapterId,
//     req.body,
//     {
//       new: true,
//     }
//   );
//   res.status(200).json({
//     status: "success",
//     data: {
//       chapter: chapter,
//     },
//   });
// };

// exports.deleteChapter = async (req, res) => {
//   const chapter = await Chapter.findByIdAndDelete(req.params.chapterId);
//   res.status(200).json({
//     status: "success",
//     data: {
//       chapter: chapter,
//     },
//   });
// };
