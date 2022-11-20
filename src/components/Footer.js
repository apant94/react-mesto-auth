import { Route } from "react-router-dom";

function Footer() {
  return (
    <Route exact path="/">
      {
        <footer className="footer">
          <p className="footer__content">&#169; 2022 Mesto Russia</p>
        </footer>
      }
    </Route>
  );
}

export default Footer;
