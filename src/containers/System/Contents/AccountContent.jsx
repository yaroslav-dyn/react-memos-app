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

const AccountContent = ({ currentUser, setUser }) => {
  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('login');
  }

  return (
    <>
      {!currentUser ?
        <Link to='/login' className="account-content__item">
          <i className="material-icons">login</i>
          <span> Sign in </span>
        </Link>
        :
        <div className="account-content__item" onClick={signOut}>
          <i className="material-icons">logout</i>
          <span>Sign out</span>
        </div>
      }
    </>
  )
};

const AccountInnerContent = connect(mapStateToProps, mapDispatchToProps)(AccountContent)

export default AccountInnerContent