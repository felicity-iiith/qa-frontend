import Link from "../Link";
import dataUIComponent from "../dataUIComponent";

const QuestionList = ({ data }) => {
  window.questions = data;
  return (
    <ul>
      {data.map(question => (
        <li>
          <Link to={`/question/${question.id}/`}>{question.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default dataUIComponent(QuestionList, "Questions", "/questions");
