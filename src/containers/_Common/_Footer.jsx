import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ServicePopover from '@/containers/System/Services/ServicePopover';
import AccountContent from '@/containers/System/Contents/AccountContent';
import '@/scss/footer.scss';
// eslint-disable-next-line import/extensions
import UserService from '@/Scripts/Services/_common/userService';
import { connect } from 'react-redux';
import { setUser } from "@/store/actions";
const classNames = require('classnames');

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: user => dispatch(setUser(user))
  };
};

const FooterComponent = ({ currentUser, setUser }) => {

  const [showPopover, setPopoverView] = useState(false);
  const footerNavClasses = classNames('container footer_nav', !currentUser ? 'centered' : '');

  const triggerPopover = () => {
    const popStatus = showPopover ? false : true;
    setPopoverView(popStatus);
  }

  useEffect( () => {
    const currentUser =  UserService.getUSerFromStorage();
    currentUser && setUser(currentUser)
  });

  return (
    <footer className="footer main-column">

      <nav className={footerNavClasses}>
        <Link className="footer_nav__link" to="/">
          <span className="footer_nav__icon material-icons">window</span>
        </Link>

        {currentUser &&
          <>
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
          </>
        }
        {!currentUser &&
          <div className="footer_nav__link accent action-icon" onClick={triggerPopover}>
            <span className="footer_nav__icon material-icons">stream</span>
          </div>
        }
      </nav>

      {
        showPopover &&
        <ServicePopover
          isOpen={showPopover}
          hidePopover={triggerPopover}
          popoverContent={<AccountContent />}
        />
      }

    </footer>
  );
}

const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterComponent)

export default Footer;
