// modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
// const auth = require("./middleware/auth");

const userRoute = require("./routes/user");
const queryRoute = require("./routes/query");
const blogRoute = require("./routes/blog");
const propertyRoute = require("./routes/property");

dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors({
  // origin: "https://futureproperties.org", // Replace with your frontend URL
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

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


app.use(express.json({ limit: "50mb" })); // Adjust the size as needed
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/property", propertyRoute);
app.use("/query", queryRoute);

app.use("/", async (req, res) => {
  res.send("<h1>App is live on the server.</h1>");
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
    console.log(err);
    
    console.log("Connection Failed!");
  });
