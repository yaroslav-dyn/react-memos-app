import React, { useEffect, useState, useRef} from "react";
import '@/scss/auth-form.scss'
import { Link, useHistory } from 'react-router-dom'
import { getApiResponse } from "@/Scripts/Services/api";
import ToastService from '@/containers/System/Services/ToastService';


const LoginComponent = () => {
  const toastRef = useRef();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();


  const getUser = () => {
    return localStorage.getItem('user');
  };

  const setUser = ({ token }) => {
    localStorage.setItem('user', token);
    setCurrentUser(token)
  };

  useEffect(() => {
    if (getUser()) history.push('/memos')
  });

  const sendLoginForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const serializeData = new URLSearchParams(formData).toString();
    if (serializeData) {
      getApiResponse('login', 'POST', serializeData, null, true).then(response => {
        if (response) setUser(response);
        else toastRef.current.notifyService('Can\'t be login', 'error')
      })
    }
  }

  return (
    <>
      <form className="login-form main-column" onSubmit={sendLoginForm}>

        <div className="login-form__row">
          <label className="auth-type__label" htmlFor="login"> Enter email </label>
          <input
            className="auth-type__input"
            type="email" id="login"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-form__row">
          <label className="auth-type__label" htmlFor="password"> Enter password </label>
          <input className="auth-type__input"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="action-btn mobile100" type="submit">Login</button>

        <p className="centered-text">
          Don't have an account?
          <br />
          <Link to="/signup">Sign Up</Link>
        </p>
      </form>
      <ToastService ref={toastRef} />
    </>
  )
};

export default LoginComponent