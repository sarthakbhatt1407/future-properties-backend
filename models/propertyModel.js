const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  locality: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  area: { type: String, required: true },
  price: { type: Number, required: true },
  facing: { type: String, required: true },
  propertyStatus: { type: String, required: true },
  furnishing: { type: String },
  floors: { type: Number, required: true },
  facingRoad: { type: String, required: true },
  old: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  deleted: { type: String, required: true },
  images: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  userId: { type: String, required: true },
  subCategory: { type: String, required: true },
});

module.exports = mongoose.model("Property", propertySchema);
