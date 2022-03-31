import React from "react";
import { Link, useHistory } from 'react-router-dom';

const AccountContent = () => {
  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem('user');
    history.push('login');
  }

  return (
    <>
      <Link to='/login' className="account-content__item">
        <i className="material-icons">login</i>
        <span> Sign in </span>
      </Link>

      <div className="account-content__item" onClick={signOut}>
        <i className="material-icons">logout</i>
        <span>Sign out</span>
      </div>
    </>
  )
};
export default AccountContent