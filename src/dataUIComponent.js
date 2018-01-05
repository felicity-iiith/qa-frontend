import dataComponent from "./dataComponent";

/**
 * A HOC which handles loading and error and the WrappedComponent only gets the data
 * @param  {Component}         WrappedComponent The component
 * @param  {(function|string)} title            The title of the page (either a function which takes the props or a string)
 * @param  {(function|string)} urlFn            See dataComponent
 * @param  {(function|string)} fetchFn          See dataComponent
 * @see dataComponent
 */
function dataUIComponent(WrappedComponent, title, urlFn, fetchFn) {
  const comp = props => (
    <div>
      <h1>{typeof title === "function" ? title(props) : title}</h1>
      {props.loading && <div>Loading...</div>}
      {props.error && <div className="error">ERROR: {props.error}</div>}
      {props.data &&
        Object.keys(props.data).length && (
          <WrappedComponent data={props.data} {...props} />
        )}
    </div>
  );
  return dataComponent(comp, urlFn, fetchFn);
}

export default dataUIComponent;
