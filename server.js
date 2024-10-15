const mongoose = require("mongoose");
const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Error💥:", err);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("MongoDB connected");
});

const server = app.listen(4000, () => {
  console.log("Listning port 4000");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Error💥:", err);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
