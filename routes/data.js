const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const getRandomData = async () => {
  const count = await Data.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  return Data.find().skip(randomIndex).limit(10);
};
router.get('/', async (req, res) => {
  const filters = req.query;
  const query = {};
  const {
    endYear,
    topics,
    sector,
    region,
    pest,
    source,
    swot,
    country,
    city
  } = filters;
  if (endYear) query.year = { $lte: parseInt(endYear) };
  if (topics) query.topics = { $in: topics.split(',') };
  if (sector) query.sector = sector;
  if (region) query.region = region;
  if (pest) query.pest = pest;
  if (source) query.source = source;
  if (swot) query.swot = swot;
  if (country) query.country = country;
  if (city) query.city = city;

  let data;
  try {
    if (Object.keys(query).length === 0) {
      data = await getRandomData();
    } else {
      data = await Data.find(query);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

router.post('/', async (req, res) => {
  const newData = new Data(req.body);
  try {
    await newData.save();
    res.json(newData);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Error saving data' });
  }
});

module.exports = router;