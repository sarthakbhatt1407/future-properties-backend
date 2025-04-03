const Blog = require("../models/blogModal");
const fs = require("fs");

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, desc, summary } = req.body;

  
    
    const image = req.files ? req.files[0].path : null; // Extract image path from multer

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBlog = new Blog({ title, image, desc, summary });
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// Delete a blog by ID
const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Optionally delete the associated image file
    if (blog.image) {
      fs.unlink(blog.image, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};

// Get a blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    
    
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

module.exports = {
  createBlog,
  deleteBlogById,
  getBlogById,
  getAllBlogs,
};