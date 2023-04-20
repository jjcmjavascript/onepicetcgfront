import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './providers/global';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './css/index.css';

Object.prototype.size = function () {
  return Object.keys(this).length;
};
Object.prototype.first = function () {
  return this[Object.keys(this)[0]];
};
Object.prototype.last = function () {
  return this[Object.keys(this)[this.size() - 1]];
};

const root = ReactDOM.createRoot(document.getElementById('root'));

/*  eslint-disable */
root.render(
  // <React.StrictMode>
  <GlobalProvider>
    <App />
  </GlobalProvider>
  // </React.StrictMode>
);
/*  eslint-enable */
