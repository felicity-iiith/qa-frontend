import { render } from "inferno";
import App from "./App";
import "./index.css";

import { Router, Route, IndexRoute } from "inferno-router";
import createBrowserHistory from "history/createBrowserHistory";

import { init as authinit, reloadUserinfo } from "./auth";
import "./fetchWithAuth";

import Hello from "./Hello";

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

const routes = (
  <Router asyncBefore={reloadUserinfo} history={browserHistory}>
    <Route path={process.env.PUBLIC_URL} component={App}>
      <IndexRoute component={Hello} />
    </Route>
  </Router>
);

async function init() {
  await authinit();
  render(routes, document.getElementById("app"));
}

init();
