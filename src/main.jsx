import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ToastProvider from "./context/ToastContext.jsx";
import ToastContainer from "./components/ui/ToastContainer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <App />
    <ToastContainer />
  </ToastProvider>
);
