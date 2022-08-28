import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.module.scss";
import { ContextProvider } from "./store/main-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>
);
