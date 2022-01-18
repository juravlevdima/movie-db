import React, {useContext, useState} from 'react';
import {NavLink, Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import {CSSTransition} from "react-transition-group";

import {LanguageContext} from "../../context/LanguageContext";
import LOCALES from "../../intl/locales";
import './Header.css'
import logo from '../../images/logo.svg'
import menu from '../../images/menu.png'

const Header = () => {
  const {language, setLanguage} = useContext(LanguageContext)
  const [burgerMenu, setBurgerMenu] = useState(false)

  const changeLang = () => {
    setLanguage(language === LOCALES.RUSSIAN ? LOCALES.ENGLISH : LOCALES.RUSSIAN)
  }

  const closeMenu = () => {
    setTimeout(() => {
      setBurgerMenu(false)
    }, 150)
  }

  return (
    <>
      <header className="header py-1 py-sm-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/"><img className="logo" src={logo} alt="TMDB"/></Link>
            <nav className="d-none d-sm-flex">
              {/*<NavLink to="/" className="btn btn-success me-2">Главная</NavLink>*/}
              <NavLink to="/films?page=1" className="btn btn-success me-2">
                <FormattedMessage id='movies'/>
              </NavLink>
              <NavLink to="/serials?page=1" className="btn btn-success me-2">
                <FormattedMessage id='serials'/>
              </NavLink>
              <button onClick={changeLang} className="btn btn-success">
                {language.slice(0, 2).toUpperCase()}
              </button>
            </nav>
            <div className="d-sm-none">
              <button onBlur={closeMenu} onClick={() => setBurgerMenu(!burgerMenu)} type="button" className="btn">
                <img className="menu-btn" src={menu} alt="Menu"/>
              </button>
            </div>
          </div>
        </div>
      </header>

      <CSSTransition
        in={burgerMenu}
        timeout={300}
        classNames="burger"
        unmountOnExit
      >
        <div className="burger">
          <NavLink to="/films?page=1" className="btn btn-success me-2">
            <FormattedMessage id='movies' />
          </NavLink>
          <NavLink to="/serials?page=1" className="btn btn-success me-2">
            <FormattedMessage id='serials' />
          </NavLink>
          <button onClick={changeLang} className="btn btn-success">
            {language.slice(0,2).toUpperCase()}
          </button>
        </div>
      </CSSTransition>
    </>
  );
};

export default Header;