import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ToastProvider from "./context/ToastContext.jsx";
import ToastContainer from "./components/ui/ToastContainer.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
        <ToastContainer />
      </CartProvider>
    </ToastProvider>
  </React.StrictMode>
);
