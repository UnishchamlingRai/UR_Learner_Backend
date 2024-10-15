const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  chapterName: {
    type: String,
    unique: true,
    required: [true, "Please add a chapter name"],
  },
  discription: {
    type: String,
    maxlength: [
      200,
      "A Discription must have less or equal then 200 characters",
    ],
    minlength: [5, "A Discription must have more or equal then 5 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: { type: String },
  unit: { type: mongoose.Schema.ObjectId, ref: "Unit", required: true },
  pdf: { type: String, required: [true, "Please add a pdf File"] },
});
const Chapter = mongoose.model("Chapter", ChapterSchema);
module.exports = Chapter;
