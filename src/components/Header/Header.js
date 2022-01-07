import React from 'react';
import {NavLink, Link} from  'react-router-dom'
import './Header.css'
import logo from '../../images/logo.svg'

const Header = () => {
  return (
    <header className="header py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/"><img className="logo" src={logo} alt="TMDB"/></Link>
          <nav>
            {/*<NavLink to="/" className="btn btn-success me-2">Главная</NavLink>*/}
            <NavLink to="/films?page=1" className="btn btn-success me-2">Фильмы</NavLink>
            <NavLink to="/serials?page=1" className="btn btn-success">Сериалы</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;