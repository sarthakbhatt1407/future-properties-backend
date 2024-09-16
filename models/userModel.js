const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  contactNum: { type: Number, required: true },
  userSince: { type: String },
  isAdmin: { type: Boolean },
  address: { type: Array },
  wishlist: { type: Array },
  verified: { type: Boolean, required: true },
  deleted: { type: Boolean },
});

module.exports = mongoose.model("User", userSchema);
