import { render } from "inferno";
import App from "./App";
import "./index.css";

import { Router, Route, IndexRoute } from "inferno-router";
import createBrowserHistory from "history/createBrowserHistory";

import { init as authinit, reloadUserinfo } from "./auth";
import "./fetchWithAuth";

import QuestionList from "./QuestionList";
import QuestionViewer from "./QuestionViewer";
import Scoreboard from "./Scoreboard";

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
      <Route path="/scoreboard" component={Scoreboard} />
      <Route path="/scoreboard/:page" component={Scoreboard} />
    </Route>
  </Router>
);

async function init() {
  await authinit();
  window.questions = await window.fetchWithAuth("/questions");
  const isOpen = window.questions.ok;
  window.questions = await window.questions.json();
  if (!isOpen) {
    // Returned by isOpen middleware in backend
    const start = new Date(window.questions.startTime).toLocaleString();
    const end = new Date(window.questions.endTime).toLocaleString();
    alert(`
Contest only available from ${start} to ${end}.
Scoreboard will still be available.`);
    window.questions = [];
  }
  render(routes, document.getElementById("app"));
}

init();
