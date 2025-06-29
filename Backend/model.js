//Write missing codes here
const mongoose = require("mongoose"); // new line
const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

//Write missing codes here
module.exports = mongoose.model("Blog", schema); // new line