import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SessionProvider } from "./providers/session";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));

/*  eslint-disable */

root.render(
  <React.StrictMode> 
    <SessionProvider>
      <App/>
    </SessionProvider>
  </React.StrictMode>
);
/*  eslint-enable */
