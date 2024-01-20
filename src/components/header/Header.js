import { useTranslation } from "react-i18next";
import Search from "../search/Search";
import LanguageSelector from "../languageSelector/LanguageSelector";
import DailyForecast from "../dailyForecast/DailyForecast";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

export default function Header() {
  const { t } = useTranslation();
  const navLinks = ["Home", "Features", "Pricing"];
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    setActive(e.target.innerText);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" role="button" href="/">
          {t("header.weather")}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="me-auto navbar-nav">
            {navLinks.map((link, i) => (
              <Link
                to={link.toLowerCase()}
                className={`nav-link ${active === link ? "active" : ""}`}
                aria-current="page"
                href="#"
                onClick={handleClick}
                key={i}
              >
                {link}
              </Link>
            ))}
          </div>
          <div className="d-flex column-gap-3">
            <Search />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
