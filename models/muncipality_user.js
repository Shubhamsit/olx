const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/olx");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  userid: {
    type: String,
    required: true,
    unique: true,
  },
  pincodes: {
    type: Array,

  },

});

module.exports = mongoose.model("muncipality_User", userSchema);
