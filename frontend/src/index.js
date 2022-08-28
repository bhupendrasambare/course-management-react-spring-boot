import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';

import "./index.css"

import 'react-toastify/dist/ReactToastify.css';

import 'jquery/dist/jquery.min.js'

// bootstrap
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.css';

// font awesome
import 'font-awesome/css/font-awesome.min.css';

//skeleton loading
import "react-loading-skeleton/dist/skeleton.css";

//datatable
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";


import store,{persistor} from "./Redux/Store"
import {PersistGate}  from "redux-persist/integration/react"
window.backend = "http://localhost:8080";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate >
    </Provider>
  </React.StrictMode>
);

