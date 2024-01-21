const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/olx");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  suggestion: {
    type: String,
  },
  landmark: {
    type: String,
  },
  pincode: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("issues", issueSchema);
