const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: [String],
  region: String,
  city: String,
  sector: String,
  pest: String,
  source: String,
  swot: String,
  title: String,
  topic: String,
  insight: String,
  url: String,
  published: Date,
});
module.exports = mongoose.model('Table1', DataSchema, 'Table1');