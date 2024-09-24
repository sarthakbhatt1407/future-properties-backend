// modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
// const auth = require("./middleware/auth");

const userRoute = require("./routes/user");
const propertyRoute = require("./routes/property");

dotenv.config();
const PORT = process.env.PORT || 3000;

// file serving
// Absolute paths for the directories
const imageUploadDirectory = path.join("uploads/images");
const audioUploadDirectory = path.join("uploads/audios");
const documentUploadDirectory = path.join("uploads/documents");
const reportUploadDirectory = path.join("uploads/reports");

// Serve static files
app.use("/uploads/images", express.static(imageUploadDirectory));
app.use("/uploads/audios", express.static(audioUploadDirectory));
app.use("/uploads/documents", express.static(documentUploadDirectory));
app.use("/uploads/reports", express.static(reportUploadDirectory));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/user", userRoute);
app.use("/property", propertyRoute);

app.use("/", async (req, res) => {
  res.send("<h1>App is live</h1>");
});

// Database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connection successful");
    });
  })
  .catch((err) => {
    console.log("Connection Failed!");
  });
