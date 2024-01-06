import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import getWeather from "./services/apiConnection";
import ipConnection from "./services/ipConnection";
import DataDisplay from "./components/dataDisplay/DataDisplay";
import Header from "./components/header/Header";
import "./styles.scss";

export default function App() {
  const [data, setData] = useState(null);
  const [lang, setLang] = useState("en");
  const [currCity, setCurrCity] = useState(null);

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
    const weatherData = await getWeather(
      inputCity,
      lang === "lv" ? "la" : lang
    );
    setData(weatherData);
    setCurrCity(inputCity);
  }

  function changeLang(currentLang) {
    i18n.changeLanguage(currentLang);
    setLang(currentLang);
  }

  return (
    <div className="app">
      <Header
        searchCity={searchCity}
        changeLang={changeLang}
        currentLang={lang}
      />
      {data ? (
        <DataDisplay data={data} lang={lang} />
      ) : (
        <div className="loading">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
