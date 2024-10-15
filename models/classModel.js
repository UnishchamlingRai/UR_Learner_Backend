const mongoose = require("mongoose");
const Subject = require("./SubjectModel");
const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Please add a class name"],
      unique: true,
    },
    image: {
      type: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

classSchema.virtual("subjects", {
  ref: "Subject",
  foreignField: "class",
  localField: "_id",
});

classSchema.pre(/^find/, function (next) {
  this.populate({
    path: "subjects",
    select: "subjectName",
  });
  next();
});

classSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await Subject.deleteMany({ class: doc._id });
      console.log("Associated subjects deleted successfully.");
    } catch (error) {
      console.error("Error deleting associated subjects:", error);
    }
  }
});

const Classes = mongoose.model("class", classSchema);
module.exports = Classes;
