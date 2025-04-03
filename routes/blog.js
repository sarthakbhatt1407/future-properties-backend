const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const fileUpload = require("../middleware/fileUpload"); // Middleware for handling file uploads

// Route to create a new blog
router.post("/add-new", fileUpload.array("image"), blogController.createBlog);

// Route to delete a blog by ID
router.delete("/delete/:id", blogController.deleteBlogById);
router.get("/all-blogs", blogController.getAllBlogs);
// Route to get a blog by ID
router.get("/:id", blogController.getBlogById);

// Route to get all blogs


module.exports = router;