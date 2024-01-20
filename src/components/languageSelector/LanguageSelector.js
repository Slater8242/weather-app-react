import { useContext } from "react";
import languageContext from "../../context/languageContext";

export default function LanguageSelector() {
  const [changeLang, currentLang] = useContext(languageContext);

  const langs = {
    en: { nativeName: "English" },
    ru: { nativeName: "Русский" },
    lv: { nativeName: "Latviski" },
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={`https://flagcdn.com/${
            currentLang === "en" ? "gb" : currentLang
          }.svg`}
          alt={currentLang}
          width="25px"
          className="me-2"
        />
        {langs[currentLang].nativeName}
      </button>
      <ul id="langSelector" className="dropdown-menu dropdown-menu-end">
        {Object.keys(langs).map((lng) => (
          <li key={lng}>
            <button
              className="dropdown-item d-flex justify-content-center align-items-center"
              onClick={() => changeLang(lng)}
            >
              <img
                src={`https://flagcdn.com/${lng === "en" ? "gb" : lng}.svg`}
                alt={lng}
                width="25px"
                className="me-2"
              />
              {langs[lng].nativeName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
