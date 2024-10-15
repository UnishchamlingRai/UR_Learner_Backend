const Unit = require("../models/unitModel");
const handlerFactory = require("./haldelFactory");
exports.setSubjectId = (req, res, next) => {
  if (!req.body.subject) {
    req.body.subject = req.params.subjectId;
  }
  next();
};
exports.createUnit = handlerFactory.create(Unit, "Unit");
exports.getAllUnits = handlerFactory.getAll(Unit, "Units");
exports.getOneUnit = handlerFactory.getOne(Unit, "Unit");
exports.deleteUnit = handlerFactory.deleteOne(Unit, "Unit");
exports.updateUnit = handlerFactory.updateOne(Unit, "Unit");

// exports.createUnit = async (req, res) => {
//   req.body.subject = req.params.subjectId;
//   const unit = await Unit.create(req.body);
//   res.status(200).json({
//     status: "success",
//     data: {
//       unit: unit,
//     },
//   });
// };

// exports.getAllUnits = async (req, res) => {
//   const units = await Unit.find({ subject: req.params.subjectId });
//   res.status(200).json({
//     status: "success",
//     data: {
//       units: units,
//     },
//   });
// };

// exports.getOneUnit = async (req, res) => {
//   console.log(req.params);
//   const unit = await Unit.findById(req.params.unitId);
//   res.status(200).json({
//     status: "success",
//     data: {
//       unit: unit,
//     },
//   });
// };

// exports.updateUnit = async (req, res) => {
//   const unit = await Unit.findByIdAndUpdate(req.params.unitId, req.body, {
//     new: true,
//   });
//   res.status(200).json({
//     status: "success",
//     data: {
//       unit: unit,
//     },
//   });
// };

// exports.deleteUnit = async (req, res) => {
//   const unit = await Unit.findByIdAndDelete(req.params.unitId);
//   res.status(200).json({
//     status: "success",
//     data: {
//       unit: unit,
//     },
//   });
// };
