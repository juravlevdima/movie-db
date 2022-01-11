import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-circular-progressbar/dist/styles.css';
import './index.css';
import App from './App';
import LanguageProvider from "./context/LanguageContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

