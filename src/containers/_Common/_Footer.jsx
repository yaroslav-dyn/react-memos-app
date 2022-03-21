import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ServicePopover from '@/containers/System/Services/ServicePopover';
import '@/scss/footer.scss';

const Footer = () => {

  const [showPopover, setPopoverView] = useState(false);

  const triggerPopover = () => {
    const popStatus = showPopover ? false : true;
    setPopoverView(popStatus);
  }

  return (
    <footer className="footer main-column">
      <nav className="container footer_nav">
        <Link className="footer_nav__link" to="/">
          <span className="footer_nav__icon material-icons">window</span>
        </Link>
        <NavLink className="footer_nav__link" to="/memos">
          <span className="footer_nav__icon material-icons">notes</span>
        </NavLink>

        <div className="footer_nav__link accent action-icon" onClick={triggerPopover}>
          <span className="footer_nav__icon material-icons">stream</span>
        </div>

        <NavLink className="footer_nav__link" to="/ideas">
          <span className="footer_nav__icon material-icons">note_alt</span>
        </NavLink>
        <NavLink className="footer_nav__link" to="/settings">
          <span className="footer_nav__icon material-icons">settings</span>
        </NavLink>
      </nav>

      {showPopover &&
        <ServicePopover hidePopover={triggerPopover} />
      }

    </footer>
  );
}

export default Footer;
