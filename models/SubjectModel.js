const mongoose = require("mongoose");
const Class = require("./classModel"); // Make sure the path is correct
const Unit = require("./unitModel");

const SubjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      unique: true,
      required: [true, "Please add a subject name"],
    },
    image: { type: String },
    class: { type: mongoose.Schema.ObjectId, ref: "Class", required: true },
    // units: [{ type: mongoose.Schema.ObjectId, ref: "Unit" }],
    description: {
      type: String,
      maxlength: [
        200,
        "A Description must have less or equal to 200 characters",
      ],
      minlength: [5, "A Description must have more or equal to 5 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// SubjectSchema.pre(/^find/, function (next) {
//   this.populate({ path: "class", select: "className" });
//   next();
// });
SubjectSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await Unit.deleteMany({ subject: doc._id });
      console.log("Associated subjects deleted successfully.");
    } catch (error) {
      console.error("Error deleting associated subjects:", error);
    }
  }
});
const Subject = mongoose.model("Subject", SubjectSchema);
module.exports = Subject;
