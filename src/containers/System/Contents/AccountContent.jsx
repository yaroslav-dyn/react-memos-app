import React from "react";
import { Link } from 'react-router-dom'
const AccountContent = () => (
  <>
    <Link to='/login' className="account-content__item">
      <i className="material-icons">login</i>
      <span> Sign in </span>
    </Link>

    <div className="account-content__item">
      <i className="material-icons">logout</i>
      <span>Sign out</span>
    </div>
  </>
);
export default AccountContent