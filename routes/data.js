const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

const createRegex = (keys) => {
  const keysArray = keys.split(" ");
  const regexPattern = keysArray.map((key) => `(?=.*${key})`).join("");
  return new RegExp(regexPattern, "i");
};

router.get("/", async (req, res) => {
  const filters = req.query;
  const { end_year, topic, sector, region, pestle, source, swot, country, city } = filters;
  let regexes = [];
  if (end_year) regexes.push({ end_year: Number(end_year) });
  if (topic) regexes.push({ topic: { $regex: createRegex(topic) } });
  if (sector) regexes.push({ sector: { $regex: createRegex(sector) } });
  if (region) regexes.push({ region: { $regex: createRegex(region) } });
  if (pestle) regexes.push({ pestle: { $regex: createRegex(pestle) } });
  if (source) regexes.push({ source: { $regex: createRegex(source) } });
  if (swot) regexes.push({ swot: { $regex: createRegex(swot) } });
  if (country) regexes.push({ country: { $regex: createRegex(country) } });
  if (city) regexes.push({ city: { $regex: createRegex(city) } });

  let data = null;
  try {
    if (!regexes.length) data = await Data.find().limit(50);
    else
      data = await Data.find({
        $and: regexes,
      }).limit(100);
    console.log({ data: data.length });
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

router.post("/", async (req, res) => {
  const newData = new Data(req.body);
  try {
    await newData.save();
    res.json(newData);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Error saving data" });
  }
});

module.exports = router;
