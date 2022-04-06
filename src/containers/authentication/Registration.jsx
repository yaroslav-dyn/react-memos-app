import React, { useState, useRef } from "react";
import '@/scss/auth-form.scss';
import { Link, useHistory } from 'react-router-dom';
import { getApiResponse } from "@/Scripts/Services/api";
import ToastService from '@/containers/System/Services/ToastService';
import UserService from "@/Scripts/Services/userService";
import { connect } from "react-redux";
import { setUser } from '@/store/actions';

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: user => dispatch(setUser(user))
  };
}

const RegisterComponent = ({ setUser }) => {
  const toastRef = useRef();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const history = useHistory();

  const setUserToken = ({ token }) => {
    UserService.setUserToStorage(token);
    setUser(token);
    history.push('/memos')
  };

  const sendLoginForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const serializeData = new URLSearchParams(formData).toString();
    if (email && password && password === confirmPassword) {
      getApiResponse('signup', 'POST', serializeData, null, true).then(response => {
        if (response) {
          toastRef.current.notifyService('Registration has been successful!', 'success');
          setTimeout(()=> {
            history.push('/login');
          }, 2000)
        } 
        else toastRef.current.notifyService('Registration hasn\'t been successful', 'error');
      })
    } else {
      toastRef.current.notifyService('Invalid data', 'error');
    }
  }

  return (
    <>
      <form className="login-form main-column" onSubmit={sendLoginForm}>

        <div className="login-form__row">
          <label className="auth-type__label" htmlFor="login"> Enter email </label>
          <input className="auth-type__input" type="text" id="login" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="login-form__row">
          <label className="auth-type__label" htmlFor="password"> Enter password </label>
          <input className="auth-type__input" type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="login-form__row">
          <label className="auth-type__label" htmlFor="password"> Repeat your password </label>
          <input className="auth-type__input" type="password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <button className="action-btn mobile100" type="submit">Sign up</button>

        <p className="centered-text">
          Have an account?
          <br />
          <Link to="/login">Go to login</Link>
        </p>

      </form>
      <ToastService ref={toastRef} />
    </>
  )
};

const Registration = connect(null, mapDispatchToProps)(RegisterComponent)

export default Registration;
