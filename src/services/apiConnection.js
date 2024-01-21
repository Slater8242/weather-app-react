const apiBase = "https://api.openweathermap.org/";
const apiKey = "64555bc1e6d8ac3073853234e29a5595";

async function getCity(city){
  const cityRes = await fetch(
    `${apiBase}geo/1.0/direct?q=${city}&appid=${apiKey}`,
  );
  const cityObj = await cityRes.json();

  return cityObj
}

export default async function getWeather(weatherType,city,lang){
  if (/\S/.test(city)) {
    const cityArr = await getCity(city);
    if (cityArr.cod !== "400") {
      const [cityData] = cityArr;
      const weatherRes = await fetch(
        `${apiBase}data/2.5/${weatherType}?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric&lang=${lang}`
      );
      const weatherData = await weatherRes.json();

      return [weatherData, cityData];
    }
  }
}
