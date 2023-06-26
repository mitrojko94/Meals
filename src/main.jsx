import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer position="top-center" autoClose={2000} />
    <App />
  </React.StrictMode>
);

// Objasnjenje:
// Uvezem ToastContainer iz biblioteke i stavim ga u kodu iznad App komponente, sa dva atributa, position, gde ce da bude pozicija teksta i sa autoClose, za koliko ce da nestane tekst, 2s u ovom slucaju
