import React from "react";
import '@/scss/auth-form.scss'


const LoginComponent = () => {

  const sendLoginForm = (e) => {
    e.preventDefault();
  }

  return (
    <form className="login-form main-column" onSubmit={sendLoginForm}>

      <div className="login-form__row">
        <label className="auth-type__label" htmlFor="login"> Enter email </label>
        <input className="auth-type__input" type="text" id="login" />
      </div>

      <div className="login-form__row">
        <label className="auth-type__label" htmlFor="password"> Enter password </label>
        <input className="auth-type__input" type="text" id="password" />
      </div>

      <button className="action-btn mobile100" type="submit">Login</button>

    </form>
  )
};

export default LoginComponent