import React, {useContext} from 'react';
import {NavLink, Link} from  'react-router-dom'
import { FormattedMessage } from 'react-intl'
import './Header.css'
import logo from '../../images/logo.svg'

import {LanguageContext} from "../../context/LanguageContext";
import LOCALES from "../../intl/locales";

const Header = () => {
  const {language, setLanguage} = useContext(LanguageContext)

  const changeLang = () => {
    setLanguage(language === LOCALES.RUSSIAN ? LOCALES.ENGLISH : LOCALES.RUSSIAN)
  }

  return (
    <header className="header py-1 py-sm-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/"><img className="logo" src={logo} alt="TMDB"/></Link>
          <nav>
            {/*<NavLink to="/" className="btn btn-success me-2">Главная</NavLink>*/}
            <NavLink to="/films?page=1" className="btn btn-success me-2">
              <FormattedMessage id='movies' />
            </NavLink>
            <NavLink to="/serials?page=1" className="btn btn-success me-2">
              <FormattedMessage id='serials' />
            </NavLink>
            <button onClick={changeLang} className="btn btn-success">{language.slice(0,2).toUpperCase()}</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;