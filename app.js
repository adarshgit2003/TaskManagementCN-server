const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/tasks");

const app = express();
app.use(cors());
dotenv.config({ path: "./config/config.env" });
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB".cyan))
  .catch((err) => {
    console.log("Failed to connect to DB".red);
    console.log(err);
  });

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//JSON format by default
app.use(express.json());

//Routes
app.use("/api", authRouter);
app.use("/api", tasksRouter);

//Page not found
app.use("/", (req, res) => {
  res.status(404).json({
    status: "Page not found",
  });
});

app.listen(8000);
