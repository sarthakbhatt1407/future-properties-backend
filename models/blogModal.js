const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  desc: { type: String, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model("Blog", blogSchema);