/* eslint jsx-a11y/anchor-is-valid: 0 */

import "./navbar.css";
import Link from "../Link";
import { logout } from "../auth";

export default () => (
  <nav className="navigation">
    <section className="container">
      <Link className="navigation-title" to="/">
        <h1 className="title">{process.env.INFERNO_APP_CONTEST_NAME}</h1>
      </Link>
      <input type="checkbox" id="navbarToggle" />
      <label for="navbarToggle" />
      <ul className="navigation-list float-right">
        <li className="navigation-item">
          <span className="navigation-link">{window.username}</span>
        </li>
        <li className="navigation-item">
          <a href="#" onClick={logout} className="navigation-link">
            Logout
          </a>
        </li>
      </ul>
    </section>
  </nav>
);
