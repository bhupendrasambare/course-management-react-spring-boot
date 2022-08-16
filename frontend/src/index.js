import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import 'jquery/dist/jquery.min.js'

// bootstrap
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.css';

// font awesome
import 'font-awesome/css/font-awesome.min.css';

//skeleton loading
import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

