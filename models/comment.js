const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: {
    type: String
  },
  body: {
    type: String
  }
});

module.exports = mongoose.model("Comment", CommentSchema);