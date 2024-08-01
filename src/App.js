import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import getWeather from "./services/apiConnection";
import DataDisplay from "./components/dataDisplay/DataDisplay";
import Header from "./components/header/Header";
import Loading from "./components/loading/Loading";
import DailyForecast from "./components/dailyForecast/DailyForecast";
import { searchContext } from "./context/searchContext";
import languageContext from "./context/languageContext";
import axios from 'axios';
import "./styles.scss";

export default function App() {
  const [data, setData] = useState(null);
  const [lang, setLang] = useState("en");
  const [currCity, setCurrCity] = useState(null);

  const { i18n } = useTranslation();

  useEffect(() => {
    axios
      .request("http://localhost:8000/iplocation")
      .then((res) => searchCity(res.data.city));
  }, []);
  
  useEffect(() => {
    searchCity(currCity);
  }, [lang]);
  
  async function searchCity(inputCity) {
    if (inputCity?.replace(/\s/g, "").length) {
      setData(null);
      const weatherData = await getWeather("weather",inputCity,lang === "lv" ? "la" : lang);
      
      setData(weatherData);
      setCurrCity(inputCity);
    }
  }

  function changeLang(currentLang) {
    i18n.changeLanguage(currentLang);
    setLang(currentLang);
  }

  return (
    <div className="app">
      <searchContext.Provider value={searchCity}>
        <languageContext.Provider value={[changeLang, lang]}>
          <Header />
        </languageContext.Provider>
      </searchContext.Provider>
      {data ? (
        <Routes>
          <Route path="/" element={<DataDisplay data={data} lang={lang} />} />
          <Route
            path="5dayforecast"
            element={
              <DailyForecast
                city={currCity}
                lang={lang}
              />
            }
          />
        </Routes>
      ) : (
        <Loading />
      )}
    </div>
  );
}
