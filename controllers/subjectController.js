const Subject = require("../models/SubjectModel");
const handlerFactory = require("./haldelFactory");
exports.setClassId = (req, res, next) => {
  if (!req.body.class) {
    req.body.class = req.params.classId;
  }
  next();
};

exports.createSubject = handlerFactory.create(Subject, "Subject");
exports.getAllSubject = handlerFactory.getAll(Subject, "Subjects");
exports.getOneSubject = handlerFactory.getOne(Subject, "Subject");
exports.deleteSubject = handlerFactory.deleteOne(Subject, "Subject");
exports.updateSubject = handlerFactory.updateOne(Subject, "Subject");
