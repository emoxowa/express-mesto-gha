const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
