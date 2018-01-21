import Component from "inferno-component";
import Link from "../Link";
import linkState from "linkstate";
import MarkdownIt from "markdown-it";
import MarkdownItKatex from "markdown-it-katex";
import MarkdownItAsciimath from "markdown-it-asciimath";
import dataUIComponent from "../dataUIComponent";

let md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});
md.use(MarkdownItKatex);
md.use(MarkdownItAsciimath);
require("markdown-it-asciimath/ASCIIMathTeXImg.js");

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
        window.questions[qno - 1].solved = true;
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
      window.user.maxLevel >
        window.questions[window.questions.length - 1].level.lno &&
      qno > window.questions.length;

    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
        />
        {!endOfContest && (
          <div dangerouslySetInnerHTML={{ __html: md.render(body) }} />
        )}
        {endOfContest && (
          <h4>
            Congrats! You have successfully completed the contest. (If any
            question is left, please go back and solve for more points.)
          </h4>
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
              {window.questions[qno - 1].solved && (
                <div className="success float-left">Solved</div>
              )}
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
          {(!window.questions[qno] ||
            window.questions[qno].level.lno <= window.user.maxLevel) &&
            qno <= window.questions.length && (
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
      window.user.maxLevel >
        window.questions[window.questions.length - 1].level.lno &&
      props.params.qno > window.questions.length;
    if (endOfContest) return "";
    else return `Q${props.params.qno}: ${props.data.title}`;
  },
  props => {
    const endOfContest =
      window.user.maxLevel >
        window.questions[window.questions.length - 1].level.lno &&
      props.params.qno > window.questions.length;
    if (endOfContest) return undefined;
    else return `/questions/${props.params.qno}`;
  }
);
