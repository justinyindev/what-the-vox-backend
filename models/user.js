const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {type: String, required: true},
  username: {type: String, required: true},
  password: { type: String, required: true },
  liked_articles: { type: [String], required: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
