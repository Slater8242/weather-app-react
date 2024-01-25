const axios = require('axios');

const geoCoding = (city,limit)=>{
  const options = {
    method: "GET",
    url: "https://api.openweathermap.org/geo/1.0/direct",
    headers: {
      "x-api-key": process.env.WEATHER_API_KEY,
    },
    params: {
      q: city,
      limit: limit,
    },
  };

  return axios
    .request(options)
    .then((response) => response)
    .catch((err) =>err);
}

module.exports = {geoCoding};
