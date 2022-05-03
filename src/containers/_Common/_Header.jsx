import React from 'react';
import { Link } from 'react-router-dom';
import memoLogo from '../../assets/img/logo.svg';
import '@/scss/header.scss';

const Header = () => (

  <header className="header main-column">

    <div className="header__nav flex-grid adjust-center justify-s-side-in">
      <div className="logo">
        <Link to="/">
          <img className="container__image" alt="logo" src={memoLogo} />
        </Link>
      </div>
      <Link to="/mlinks">Mlinks</Link>
    </div>
 
    <div className="api_status__container">

    </div>
  </header>

);//;

export default Header;


