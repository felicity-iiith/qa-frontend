import Link from "../Link";
import dataUIComponent from "../dataUIComponent";

const QuestionList = ({ data }) => {
  window.questions = data;
  return (
    <ul>
      {data.map(question => (
        <li>
          {question.qno > window.user.maxUnlock ? (
            question.title
          ) : (
            <Link to={`/question/${question.qno}/`}>{question.title}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default dataUIComponent(QuestionList, "Questions", "/questions");
