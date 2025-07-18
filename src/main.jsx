import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProvideCities } from "./contexts/citiesContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <ProvideCities> */}
      <App />
      {/* </ProvideCities> */}
    </AuthProvider>
  </React.StrictMode>
);
