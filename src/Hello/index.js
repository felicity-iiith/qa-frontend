import dataUIComponent from "../dataUIComponent";

const hello = props => <div>Hello {props.data.username}</div>;

export default dataUIComponent(hello, "Hello", () => "/users");
