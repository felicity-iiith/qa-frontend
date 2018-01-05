import { render } from "inferno";
import App from "./App";
import "./index.css";

import { Router, Route, IndexRoute } from "inferno-router";
import createBrowserHistory from "history/createBrowserHistory";

import { init as authinit, logout } from "./auth";
import "./fetchWithAuth";

import Hello from "./Hello";

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

authinit();

const routes = (
  <Router history={browserHistory}>
    <Route path={process.env.PUBLIC_URL} component={App}>
      <IndexRoute component={Hello} />
      <Route path="/logout" component={logout} />
    </Route>
  </Router>
);

render(routes, document.getElementById("app"));
