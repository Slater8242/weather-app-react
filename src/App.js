import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import getWeather from "./services/apiConnection";
import ipConnection from "./services/ipConnection";
import DataDisplay from "./components/dataDisplay/DataDisplay";
import Header from "./components/header/Header";
import searchContext from "./context/searchContext";
import "./styles.scss";
import languageContext from "./context/languageContext";
import Loading from "./components/loading/Loading";
import { Route, Routes } from "react-router-dom";
import DailyForecast from "./components/dailyForecast/DailyForecast";

export default function App() {
  const [data, setData] = useState(null);
  const [lang, setLang] = useState("en");
  const [currCity, setCurrCity] = useState("");

  const { i18n } = useTranslation();
  
  useEffect(() => {
    (async () => {
      const { city } = await ipConnection();
      searchCity(city);
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      searchCity(currCity);
    })();
  }, [lang]);

  async function searchCity(inputCity) {
    setData(null);
    const weatherData = await getWeather(inputCity,lang === "lv" ? "la" : lang,);
    setData(weatherData);
    setCurrCity(inputCity);
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
          <Route path="features" element={<DailyForecast />} />
        </Routes>
      ) : (
        <Loading />
      )}
    </div>
  );
}
