import { render } from "inferno";
import App from "./App";
import "./index.css";

import { Router, Route, IndexRoute } from "inferno-router";
import createBrowserHistory from "history/createBrowserHistory";

// import './fetchWithAuth';

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

window.email = window.localStorage.getItem("email");

const Hello = () => <div>Hello World!</div>;

const routes = (
  <Router history={browserHistory}>
    <Route path={process.env.PUBLIC_URL} component={App}>
      <IndexRoute component={Hello} />
    </Route>
  </Router>
);

render(routes, document.getElementById("app"));
