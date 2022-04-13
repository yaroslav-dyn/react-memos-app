import React, { useState, useRef} from "react";
import '@/scss/auth-form.scss';
import { Link, useHistory } from 'react-router-dom';
import { getApiResponse } from "@/Scripts/Services/_common/api";
import UserService from "@/Scripts/Services/_common/userService.js";

import { connect } from "react-redux";
import { setUser, setToastData } from "@/store/actions/index";

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: user => dispatch(setUser(user)),
    setToastData: data => dispatch(setToastData(data))
  };
}

const LoginComponent = ({ setUser, setToastData }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  const setUserToken = ({token}) => {
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
    if (serializeData) {
      getApiResponse('login', 'POST', serializeData, null, true).then(response => {
        if (response) {
          setUserToken(response);
        }
        else {
          setUser(null);
          setToastData({ title: 'Can\'t be login', type: 'error' });
        }
      })
    }
  }

  return (
    <div className="container main-column">
      <form className="login-form" onSubmit={sendLoginForm}>

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
    </div>
  )
};

const Login = connect(null, mapDispatchToProps)(LoginComponent)

export default Login
