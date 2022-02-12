import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (

    <footer className="footer main-column">
        <nav className="footer_nav">
            {/* <NavLink
                refUrl="/"
                linkClass="footer_nav__link"
                iconClass="footer_nav__icon"
                iconSymbol="notes">
            </NavLink>

            <NavLink
                refUrl="/idea"
                linkClass="footer_nav__link"
                iconClass="footer_nav__icon"
                iconSymbol="note_alt">
            </NavLink>

            <NavLink
                refUrl="/settings"
                linkClass="footer_nav__link"
                iconClass="footer_nav__icon"
                iconSymbol="settings">
            </NavLink> */}

            <Link className="footer_nav__link" to="/">
                <span className="footer_nav__icon material-icons">home</span>
            </Link>

            <Link className="footer_nav__link" to="/memos">
                <span className="footer_nav__icon material-icons">notes</span>
            </Link>

            <Link className="footer_nav__link" to="/ideas">
                <span className="footer_nav__icon material-icons">note_alt</span>
            </Link>

            <Link className="footer_nav__link" to="/settings">
                <span className="footer_nav__icon material-icons">settings</span>
            </Link>

        </nav>
    </footer>

)//;

export default Footer;