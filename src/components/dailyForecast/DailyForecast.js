import { useEffect, useState } from 'react';
import getWeather from '../../services/apiConnection';

const iconBase = "https://openweathermap.org/img/wn/";

export default function DailyForecast({city, lang}) {
  const [weatherData, setWeatherData] = useState();
  const [locationData, setLocationData] = useState();
  
  useEffect(()=>{
    (async () => {
      const data = await getWeather(
        "forecast",
        city,
        lang === "lv" ? "la" : lang
      );
      const [weather, location] = data;
      setWeatherData(weather);
      setLocationData(location)
    })();
  },[])

  if (weatherData !== undefined && locationData !==undefined) {
    const {list} = weatherData;
    console.log(locationData);
    const nameExist = (city) => {
      if (city.local_names) {
        if (city.local_names[lang]) {
          return city.local_names[lang];
        } else {
          return city.name;
        }
      } else {
        return city.name;
      }
    };

    return (
      <>
        <h1 className="text-center text-white">5 Day Weather Forecast</h1>
        <div className="row mx-auto">
          {list.map((value, i) => {
            const { weather, main, sys, wind } = value;
            return (
              <div className="col">
                <div
                  className="card text-bg-dark text-center mb-3 mx-auto"
                  style={{ width: "18rem" }}
                  key={i}
                  >
                  <div className="card-header">
                    <small>{value.dt_txt}</small>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {nameExist(locationData)}
                      &nbsp;
                      <img
                        src={`https://flagcdn.com/${locationData.country.toLowerCase()}.svg`}
                        width="45"
                        alt={locationData.country.toLowerCase()}
                        />
                    </h5>
                    <div className="card-text ">
                      <img
                        src={`${iconBase}${weather[0].icon}.png`}
                        alt={weather[0].description}
                        />
                      <p className="mb-0">{Math.round(main.temp)}&#8451;</p>
                      <p className="mb-0">&nbsp;{weather[0].description}</p>
                    </div>
                  </div>
                  <div className="card-header">
                    <small>{value.dt_txt}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
