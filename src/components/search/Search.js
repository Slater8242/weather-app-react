import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import searchContext from "../../context/searchContext";

export default function Search() {
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState("");
  const { t } = useTranslation();
  const searchCity = useContext(searchContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (value) {
      searchCity(value);
    }
    value.length === 0 ? setValidated(" was-validated") : setValidated("");
  }

  useEffect(() => {
    if (value) {
      value.length === 0 ? setValidated(" was-validated") : setValidated("");
    }
  }, [value]);

  return (
    <form
      className={`d-flex needs-validation${validated}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className="form-control me-2"
        type="text"
        placeholder={t("header.search")}
        value={value}
        onInput={(e) => setValue(e.target.value)}
        required
      />
      <button className="btn btn-outline-light" type="submit">
        {t("header.search")}
      </button>
    </form>
  );
}
