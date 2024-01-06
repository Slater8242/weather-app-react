import { useTranslation } from "react-i18next";
import Search from "../search/Search";
import LanguageSelector from "../languageSelector/LanguageSelector";

export default function Header({ searchCity, changeLang, currentLang }) {
  const { t } = useTranslation();
  return (
    <nav className="navbar bg-dark mb-3">
      <div className="container-fluid">
        <a className="navbar-brand text-white" role="button" href="/">
          {t("header.weather")}
        </a>
        <Search searchCity={searchCity} />
        <LanguageSelector changeLang={changeLang} currentLang={currentLang} />
      </div>
    </nav>
  );
}
