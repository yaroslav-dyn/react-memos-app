import React from 'react';
import { Link } from 'react-router-dom';
import '@/scss/footer.scss';

const Footer = () => (
  <footer className="footer main-column">
    <nav className="footer_nav">
      <Link className="footer_nav__link" to="/">
        <span className="footer_nav__icon material-icons">window</span>
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
);

export default Footer;
