const mongoose = require("mongoose");

const headlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  summary: { type: String, required: true },
  comments: [{
    user: { type: String, required: true },
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    created_at: {type: Date, required: true},
  }]
});

const Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;
