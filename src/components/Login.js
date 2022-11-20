import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(email, password);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__definition">Вход</h2>
      <input
        id="email-input"
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        className="form__input"
        placeholder="Email"
        minLength="2"
        maxLength="60"
        required
      />
      <input
        id="password-input"
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        className="form__input"
        placeholder="Пароль"
        minLength="8"
        maxLength="100"
        required
      />
      <button type="submit" className="form__submit">
        Войти
      </button>
    </form>
  );
}

export default Login;
