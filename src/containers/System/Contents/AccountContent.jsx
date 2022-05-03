import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { setUser } from "@/store/actions/index";

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: user => dispatch(setUser(user))
  };
}

const AccountContent = ({ currentUser, setUser, onItemAction }) => {
  const history = useHistory();

  const goLogin = () => {
    history.push('login');
    onItemAction();
  }

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('login');
    onItemAction();
  }

  return (
    <>
      {!currentUser ?
        <div className="account-content__item" onClick={goLogin}>
          <i className="material-icons success-text">login</i>
          <span className='success-text'> Sign in </span>
        </div>
        :
        <>
          <div className="account-content__item" onClick={signOut}>
            <i className="material-icons danger-text">power_settings_new</i>
            <span className="danger-text">Sign out</span>
          </div>

          <Link className="account-content__item" to="/mlinks" onClick={onItemAction}>
            <i className="material-icons">share</i>
            <span>MemoLinks</span>
          </Link>
        </>
      }
    </>
  )
};

const AccountInnerContent = connect(mapStateToProps, mapDispatchToProps)(AccountContent)

export default AccountInnerContent