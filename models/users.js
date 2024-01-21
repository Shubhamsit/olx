const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/olx");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
