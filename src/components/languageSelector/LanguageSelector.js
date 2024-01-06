export default function LanguageSelector({ changeLang, currentLang }) {
  const langs = {
    en: { nativeName: "English" },
    ru: { nativeName: "Русский" },
    lv: { nativeName: "Latviešu" },
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
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
