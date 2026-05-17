import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import About from "./pages/About";
import Btn from "./pages/Btn";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <About />
    <Btn />
  </React.StrictMode>
);