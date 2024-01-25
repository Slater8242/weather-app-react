const port = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const {ipConnection} = require("./ipConnection");
const {geoCoding} = require("./geoCoding");
const {weather} = require("./weather");

require("dotenv").config();

const app = express();

app.use(cors());

app.get("/iplocation", async (req, res) => {
  try {
    const locationData = await ipConnection();
    res.json(locationData.data);
  } catch (error) {
    return res.status(error);
  }
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/geocoding", async (req, res) => {
  try {
    const geoData = await geoCoding(req.query.q, req.query.limit);
    res.json(geoData.data);
  } catch (error) {
    return res.status(error);
  }
});

app.get("/weather", async (req, res) => {
  try {
    const weatherData = await weather(
      req.query.lat,
      req.query.lon,
      req.query.units,
      req.query.lang
      );
    res.json(weatherData)
  } catch (error) {
    return res.status(error)
  }
});

app.listen(port, () => console.log(`server is running on port ${port}`));
