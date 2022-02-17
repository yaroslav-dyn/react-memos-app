import React from 'react';
import {Link} from 'react-router-dom';
import memoLogo from '../../assets/img/logo.svg';
import '@/scss/header.scss';

const Header = () => (
    
    <header className="header">
        <div className="logo">
        <Link to="/">
            <img className="container__image" alt="react logo" src={memoLogo} />
        </Link>    
        </div>
        <div className="api_status__container">
        
        </div>
    </header>
     
)//;
    
export default Header;
    
    
    