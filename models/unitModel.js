const mongoose = require("mongoose");
const Chapter = require("./chapterModel");

const UnitSchema = new mongoose.Schema({
  unitName: {
    type: String,
    required: [true, "Please add a unit name"],
    unique: true,
  },
  image: { type: String },
  subject: { type: mongoose.Schema.ObjectId, ref: "Subject", required: true },
  // chapters: [{ type: mongoose.Schema.ObjectId, ref: "Chapter" }],
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
});

UnitSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await Chapter.deleteMany({ unit: doc._id });
      console.log("Associated subjects deleted successfully.");
    } catch (error) {
      console.error("Error deleting associated subjects:", error);
    }
  }
});

const Unit = mongoose.model("Unit", UnitSchema);

module.exports = Unit;
