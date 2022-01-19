import React from 'react';
import {FormattedMessage} from 'react-intl'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer py-2 text-light">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="footer-link">
          <span>
            <FormattedMessage id="data_provided"/>
          </span>
          <a className="text-decoration-none" href="https://www.themoviedb.org/">
            www.themoviedb.org
          </a>
        </div>
        <div>2022</div>
      </div>
    </footer>
  );
};

export default Footer;