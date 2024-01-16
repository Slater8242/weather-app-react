import { useTranslation } from "react-i18next";
import Search from "../search/Search";
import LanguageSelector from "../languageSelector/LanguageSelector";
import DailyForecast from '../dailyForecast/DailyForecast';
import { useState } from 'react';

export default function Header({ searchCity, changeLang, currentLang }) {
  const { t } = useTranslation();
  // const navLinks = ["Home", "Features", "Pricing"]
  // const [active,setActive] = useState(false);

  // const handleClick =(e)=>{
  //   setActive(e.target.innerText);
  // }

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" role="button" href="/">
          {t("header.weather")}
        </a>
        <div className="me-auto">
          <div className="navbar-nav">
            {/* {navLinks.map((link, i) => (
              <a
                className={`nav-link ${
                  active === link ? "active" : ""
                }`}
                aria-current="page"
                href="#"
                onClick={handleClick}
                key={i}
              >
              {link}
              </a>
            ))} */}
            <DailyForecast />
          </div>
        </div>
        <div className="d-flex column-gap-3">
          <Search searchCity={searchCity} />
          <LanguageSelector changeLang={changeLang} currentLang={currentLang} />
        </div>
      </div>
    </nav>
  );
}
