import { Link } from "inferno-router";

export default props => (
  <Link {...props} to={process.env.PUBLIC_URL + props.to}>
    {props.children}
  </Link>
);
