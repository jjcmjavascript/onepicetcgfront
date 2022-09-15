
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {SessionProvider} from './providers/sessionProvider'; 

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider>
      <App></App>
    </SessionProvider>
  </React.StrictMode>
);