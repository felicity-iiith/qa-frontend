import Link from "../Link";

const QuestionList = ({ data }) => (
  <div>
    <h1>Questions</h1>
    <ul>
      {window.questions.map(question => (
        <li>
          {question.qno > window.user.maxUnlock ? (
            question.title
          ) : (
            <Link to={`/question/${question.qno}/`}>{question.title}</Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default QuestionList;
