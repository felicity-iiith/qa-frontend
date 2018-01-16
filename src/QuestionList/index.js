import Link from "../Link";

const QuestionList = ({ data }) => {
  let levelQuestion = [],
    levels = {};
  for (let question of window.questions) {
    levels[question.level.lno] = question.level;
    while (!levelQuestion[question.level.lno - 1]) levelQuestion.push([]);
    levelQuestion[question.level.lno - 1].push(question);
  }

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {levelQuestion.map((level, lno) => (
          <li>
            Level {lno + 1}
            <span class="float-right">
              Solve at least <b>{levels[lno + 1].minSolve}</b> questions to
              unlock next level.
            </span>
            <ul>
              {level.map(question => (
                <li>
                  {question.level.lno > window.user.maxLevel ? (
                    question.title
                  ) : (
                    <Link to={`/question/${question.qno}/`}>
                      {question.title}
                    </Link>
                  )}
                  {question.solved && <span className="success"> Solved</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
