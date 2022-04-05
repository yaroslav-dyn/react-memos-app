import React, { useEffect, useState, useRef } from "react";
import '@/scss/auth-form.scss';
import { Link, useHistory } from 'react-router-dom';
import { getApiResponse } from "@/Scripts/Services/api";
import ToastService from '@/containers/System/Services/ToastService';
import UserService from "@/Scripts/Services/userService";


const RegisterComponent = () => {
  const toastRef = useRef();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  const history = useHistory();

  const setUser = ({ token }) => {
    UserService.setUserToStorage(token);
    setCurrentUser(token);
  };

  useEffect(() => {
    if (UserService.getUSerFromStorage()) history.push('/memos')
  }, [currentUser]);

  const sendLoginForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const serializeData = new URLSearchParams(formData).toString();
    console.log(
      'data', serializeData, password, confirmPassword
    );
    if (email && password && password === confirmPassword) {
      getApiResponse('signup', 'POST', serializeData, null, true).then(response => {
        if (response) setUser(response);
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

export default RegisterComponent