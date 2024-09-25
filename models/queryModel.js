const mongoose = require("mongoose");

const querySchema = mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  dateTime: { type: String, required: true },
  property: { type: String, required: true },
  userTo: { type: String, required: true },
  userFrom: { type: String, required: true },
  contactNum: { type: Number, required: true },
});

module.exports = mongoose.model("Query", querySchema);
