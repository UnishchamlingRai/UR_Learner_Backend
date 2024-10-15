const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.getAll = (Model, ModelName) => {
  return catchAsync(async (req, res) => {
    let filter = {};
    if (req.params.classId) {
      filter = { class: req.params.classId };
    }
    if (req.params.subjectId) {
      filter = { subject: req.params.subjectId };
    }
    if (req.params.unitId) {
      filter = { unit: req.params.unitId };
    }

    const doc = await Model.find(filter);
    res.status(200).json({
      status: "success",
      results: doc.length,
      message: `${ModelName} fetched successfully`,
      data: {
        total: doc.length,
        [ModelName]: doc,
      },
    });
  });
};

// const catchAsync = ;

exports.getOne = (Model, ModelName) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError(`No ${ModelName} found with that ID`, 404));
    }
    res.status(200).json({
      status: "success",
      message: `${ModelName} fetched successfully`,
      data: {
        [ModelName]: doc,
      },
    });
  });
};

exports.create = (Model, ModelName) => {
  return catchAsync(async (req, res) => {
    // console.log("BOdy:", req.body);
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      message: `${ModelName} created successfully`,
      data: {
        data: doc,
      },
    });
  });
};

exports.updateOne = (Model, ModelName) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) {
      return next(new AppError(`No ${ModelName} found with that ID`, 404));
    }

    res.status(200).json({
      status: "success",
      message: `${ModelName} updated successfully`,
      data: {
        data: doc,
      },
    });
  });
};

exports.deleteOne = (Model, ModelName) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError(`No ${ModelName} found with that ID`, 404));
    }
    res.status(200).json({
      status: "success",
      message: `${ModelName} deleted successfully`,
      data: {
        data: doc,
      },
    });
  });
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadImage = upload.single("image");

exports.setImage = (req, res, next) => {
  // if (req.file) req.body.pdf = req.file.filename;
  if (req.file) req.body.image = req.file.filename;
  next();
};
