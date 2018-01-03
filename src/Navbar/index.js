import "./navbar.css";
import Link from "../Link";

export default () => (
  <nav className="navigation">
    <section className="container">
      <Link className="navigation-title" to="/">
        <h1 className="title">{process.env.INFERNO_APP_CONTEST_NAME}</h1>
      </Link>
      <ul className="navigation-list float-right">
        {!window.email ? (
          <li className="navigation-item">
            <Link to="/login" className="navigation-link">
              Login
            </Link>
          </li>
        ) : (
          <li className="navigation-item">
            <Link to="/logout" className="navigation-link">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </section>
  </nav>
);
