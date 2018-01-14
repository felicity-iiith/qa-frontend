import Component from "inferno-component";
import Link from "../Link";
import linkState from "linkstate";
import MarkdownIt from "markdown-it";
import dataUIComponent from "../dataUIComponent";

let md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

class QuestionViewer extends Component {
  state = {
    answer: "",
    error: ""
  };

  checkAnswer = async e => {
    e.preventDefault();
    const { qno } = this.props.data;
    let res = await window.fetchWithAuth(`/questions/${qno}/answer`, {
      method: "POST",
      body: {
        answer: this.state.answer
      }
    });
    try {
      res = await res.json();
      if (res.status) {
        this.setState({ answer: "", error: "" });
        window.browserHistory.push(
          `${process.env.PUBLIC_URL}/question/${qno + 1}`
        );
      } else {
        this.setState({ error: res.error || "Wrong answer" });
      }
    } catch (e) {
      this.setState({ error: res.body });
    }
  };

  render() {
    let qno = parseInt(this.props.params.qno, 10);
    const { body } = this.props.data;
    const { answer, error } = this.state;
    const endOfContest =
      window.user.maxUnlock > window.questions.length &&
      qno > window.questions.length;

    return (
      <div>
        {!endOfContest && (
          <div dangerouslySetInnerHTML={{ __html: md.render(body) }} />
        )}
        {endOfContest && (
          <h4>Congrats! You have successfully completed the contest.</h4>
        )}
        <br />
        {!endOfContest && (
          <form onSubmit={this.checkAnswer}>
            <label for="answer">Answer</label>
            <input
              type="text"
              name="answer"
              value={answer}
              onChange={linkState(this, "answer")}
            />
            <div className="clearfix">
              <div class="error float-left">{error}</div>
              <button className="button-primary float-right">Check</button>
            </div>
          </form>
        )}
        <div className="clearfix">
          {qno !== 1 && (
            <Link className="button float-left" to={`/question/${qno - 1}`}>
              Prev
            </Link>
          )}
          {qno < window.user.maxUnlock && (
            <Link className="button float-right" to={`/question/${qno + 1}`}>
              Next
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default dataUIComponent(
  QuestionViewer,
  props => {
    const endOfContest =
      window.user.maxUnlock > window.questions.length &&
      props.params.qno > window.questions.length;
    if (endOfContest) return "";
    else return `Q${props.params.qno}: ${props.data.title}`;
  },
  props => {
    const endOfContest =
      window.user.maxUnlock > window.questions.length &&
      props.params.qno > window.questions.length;
    if (endOfContest) return undefined;
    else return `/questions/${props.params.qno}`;
  }
);
