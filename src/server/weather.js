const axios = require('axios');

const weather = async (lat,lon,units,lang)=>{
  try {
    const options = {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        lat: lat,
        lon: lon,
        units: units,
        lang: lang,
      },
      headers: {
        "x-api-key": process.env.WEATHER_API_KEY,
      },
    };
    
    const res = await axios.request(options);
    return res.data
  } catch (error) {
    return error.response.data;
  }

}

module.exports = {weather}