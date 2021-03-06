import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "react-datepicker/dist/react-datepicker.css"

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
