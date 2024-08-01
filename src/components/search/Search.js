import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {searchContext, searchArr} from "../../context/searchContext";
import {getCity} from '../../services/apiConnection';


export default function Search() {
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState("");
  const [show, setShow] = useState(false);
  const [cityArr, setCityArr] = useState([]);

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
      getCity(value).then((array) => {
        console.log(array);
        if (array.length !== 0) {
          setCityArr(array);
        } else {
          setCityArr([]);
          setShow(false);
        }
      });
    } else {
      setCityArr([]);
      setShow(false);
    }
  }, [value]);

  console.log(cityArr);
  return (
    <div
      className={`d-flex dropdown needs-validation${validated}`}
      onBlur={(e) => e.relatedTarget === null ? setShow(false) : null}
      onFocus={() => cityArr.length !== 0 ? setShow(true) : null}
      noValidate
    >
      <input
        className="form-control me-2"
        aria-expanded={show ? true : false}
        type="text"
        placeholder={t("header.search")}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          cityArr.length !== 0 ? setShow(true) : null;
        }}
        required
      />
      <ul className={`dropdown-menu mt-5 ${show ? "show" : ""}`}>
        {cityArr?.map((city, i) => (
          <li key={i}>
            <button
              className="dropdown-item"
              onClick={(e) => {
                setValue(e.target.dataset.city);
                setShow(false);
              }}
              style={{ cursor: "pointer" }}
              data-city={city.name}
            >
              <img
                src={`https://flagcdn.com/w40/${city.country.toLowerCase()}.png`}
                alt={city.country}
              />
              &nbsp;
              {city.name}
              &nbsp;
              {city.state}
            </button>
          </li>
        ))}
      </ul>
      <button className="btn btn-outline-light" onClick={handleSubmit}>
        {t("header.search")}
      </button>
    </div>
  );
}
