import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./i18n";

import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode, Suspense } from "react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

document.body.classList.add("bg-secondary");

root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
