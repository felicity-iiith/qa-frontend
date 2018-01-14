import Link from "../Link";
import dataUIComponent from "../dataUIComponent";

const Scoreboard = ({ data, params }) => {
  let page = params.page || 1;
  page = parseInt(page, 10);
  return (
    <div>
      <div className="clearfix">
        {page !== 1 && (
          <Link className="button float-left" to={`/scoreboard/${page - 1}`}>
            Prev
          </Link>
        )}
        {page < data.pageCount && (
          <Link className="button float-right" to={`/scoreboard/${page + 1}`}>
            Next
          </Link>
        )}
      </div>
      <table>
        <thead>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </thead>
        <tbody>
          {data.scores.map((user, index) => (
            <tr key={index}>
              <td>{index + 1 + (page - 1) * data.pageLimit}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default dataUIComponent(
  Scoreboard,
  "Scoreboard",
  props => `/scoreboard/${props.params.page || 1}`
);
