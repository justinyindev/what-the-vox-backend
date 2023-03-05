const mongoose = require('mongoose');

const headlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  summary: { type: String, required: false }
});

const Headline = mongoose.model('Headline', headlineSchema);

module.exports = Headline;
