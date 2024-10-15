const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ClassRouter = require("./Routes/classRoute");
const SubjectRouter = require("./Routes/subjectRouter");
const UnitRouter = require("./Routes/unitRoute");
const ChapterRouter = require("./Routes/chapterRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const UserRouter = require("./Routes/userRoute");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.options(
  "*",
  cors({
    origin: "http://localhost:5173/", // Replace with your frontend domain
    credentials: true,
  })
);

app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/v1/class", ClassRouter);
app.use("/api/v1/subject", SubjectRouter);
app.use("/api/v1/unit", UnitRouter);
app.use("/api/v1/chapter", ChapterRouter);
app.use("/api/v1/user", UserRouter);

// /api/v1/class/1245454545/subjects

app.all("*", (req, res, next) => {
  //   res.status(404).json({
  //     status: "fail",
  //     message: `Can't find ${req.originalUrl} on this server`,
  //   });
  //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //   err.statusCode = 404;
  //   err.status = "fail";
  //   next(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
