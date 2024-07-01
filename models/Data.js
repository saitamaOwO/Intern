const mongoose = require("mongoose");

const InsightSchema = new mongoose.Schema({
  end_year: { type: Number, required: false },
  intensity: { type: String, required: false },
  sector: { type: String, required: false },
  topic: { type: String, required: false },
  insight: { type: String, required: false },
  url: { type: String, required: false },
  region: { type: String, required: false },
  start_year: { type: String, required: false },
  impact: { type: String, required: false },
  added: { type: String, required: false },
  published: { type: String, required: false },
  country: { type: String, required: false },
  relevance: { type: String, required: false },
  pestle: { type: String, required: false },
  source: { type: String, required: false },
  title: { type: String, required: false },
  likelihood: { type: String, required: false },
});
module.exports = mongoose.model("Table1", InsightSchema, "Table1");
