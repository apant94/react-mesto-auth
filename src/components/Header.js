import { Link, Route, Switch } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route exact path="/">
          {
            <div className="header__wrapper">
              <p className="header__email">{props.email}</p>
              <Link
                className="header__link header__link_logout"
                to="/sign-in"
                onClick={props.onClick}
              >
                Выйти
              </Link>
            </div>
          }
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
