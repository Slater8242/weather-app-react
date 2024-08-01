import axios from 'axios';

export const getCity = async (city) => {
  const geoCode = await axios.request(
    `http://localhost:8000/geoCoding?q=${city}&limit=5`
  );
  return geoCode.data
}


export default async function getWeather(weatherType, city, lang = "en", units = "metric") {
  const geoCode = await getCity(city)
  
  if (geoCode.length > 0) {
    const options = {
      method: "GET",
      url: `http://localhost:8000/${weatherType}`,
      params: {
        lat: geoCode[0].lat,
        lon: geoCode[0].lon,
        lang: lang,
        units: units,
      },
    };
    const weather = await axios.request(options);
    const weatherData = weather.data;
    return { weatherData, geoCode };
  }
}

