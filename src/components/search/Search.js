import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Search({ searchCity }) {
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    if (value) {
      searchCity(value);
    }
    console.log(!e.currentTarget.checkValidity());
    if (!e.currentTarget.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <form
      className="d-flex needs-validation"
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control me-2"
        type="text"
        placeholder={t("header.search")}
        aria-label="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // required
      />
      <div className="valid-feedback">Wrong city</div>
      <button className="btn btn-outline-success" type="submit">
        {t("header.search")}
      </button>
    </form>
  );
}
