import { useTranslation } from "react-i18next";
import "./dataDisplay.scss";

export default function DataDisplay({ data, lang }) {
  const iconBase = "https://openweathermap.org/img/wn/";

  if (data.length == 2) {
    const [weatherObj, locationObj] = data;
    const { weather, main, sys, wind } = weatherObj;
    const { t } = useTranslation();

    const nameExist = (obj) => {
      if (obj.local_names) {
        if (obj.local_names[lang]) {
          return obj.local_names[lang];
        } else {
          return obj.name;
        }
      } else {
        return obj.name;
      }
    };

    const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString(
      "en-GB"
    );
    const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString("en-GB");

    return (
      <>
        <div className="tempDisplay">
          <img
            src={`${iconBase}${weather[0].icon}@2x.png`}
            alt={weather[0].description}
          />
          <h1>{Math.round(main.temp)}&#8451;</h1>
          <h1>&nbsp;{weather[0].description}</h1>
        </div>
        <div className="weatherDescription">
          <h1>
            {nameExist(locationObj)}
            &nbsp;
            <img
              src={`https://flagcdn.com/${locationObj.country.toLowerCase()}.svg`}
              width="45"
              alt={locationObj.country.toLowerCase()}
            />
          </h1>
          <h3>
            {t("wind")}: {wind.speed} m/s
          </h3>
          <h3>
            {t("sunrise")}: {sunriseTime}
          </h3>
          <h3>
            {t("sunset")}: {sunsetTime}
          </h3>
          <h3>
            {t("feelsLike")}: {Math.round(main.feels_like)}&#8451;
          </h3>
          <h3>
            {t("humidity")}: {main.humidity}&#37;
          </h3>
          <h3>
            {t("pressure")}: {main.pressure}&nbsp;&#13169;
          </h3>
        </div>
      </>
    );
  } else {
    return (
      <h1 className="text-center text-danger-emphasis">
        Incorrect City! <br /> Please input correct city name!
      </h1>
    );
  }
}
