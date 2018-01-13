import { render } from "inferno";
import App from "./App";
import "./index.css";

import { Router, Route, IndexRoute } from "inferno-router";
import createBrowserHistory from "history/createBrowserHistory";

import { init as authinit, reloadUserinfo } from "./auth";
import "./fetchWithAuth";

import QuestionList from "./QuestionList";
import QuestionViewer from "./QuestionViewer";

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

async function routeChange() {
  document.getElementById("navbarToggle").checked = false;
  await reloadUserinfo();
}

const routes = (
  <Router asyncBefore={routeChange} history={browserHistory}>
    <Route path={process.env.PUBLIC_URL} component={App}>
      <IndexRoute component={QuestionList} />
      <Route path="/question/:qno" component={QuestionViewer} />
    </Route>
  </Router>
);

async function init() {
  await authinit();
  render(routes, document.getElementById("app"));
}

init();
