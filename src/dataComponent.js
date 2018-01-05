import Component from "inferno-component";

/**
 * A HOC which provides in props, `data`, `error` and `loading`
 * @param  {Component} WrappedComponent The component
 * @param  {(function|string)} urlFn    A function which takes the props as the parameter and returns the url
 *                                      If it is not a function, then it is used as the url
 *                                      The urls must be devoid of the prefix specified in .env
 * @param  {(function|string)} fetchFn  (optional) A function which takes care of fetching (useful for POST etc)
 *                                      and returns a object `{ error, data }`
 */
function dataComponent(WrappedComponent, urlFn, fetchFn) {
  class ABC extends Component {
    state = {
      data: {},
      loading: true,
      error: ""
    };

    async componentDidMount() {
      this.updateComponent(this.props);
    }

    async componentWillReceiveProps(nextProps) {
      this.updateComponent(nextProps);
    }

    async updateComponent(props) {
      let error, data;
      if (fetchFn) {
        this.setState({ loading: true });
        try {
          ({ error, data } = await fetchFn(props));
        } catch (e) {
          error = "500 " + JSON.stringify(e);
        }
        this.setState({ data: data, error: error, loading: false });
      } else {
        try {
          await this.fetchData(props);
        } catch (e) {
          error = "500 " + JSON.stringify(e);
          this.setState({ error, loading: false });
        }
      }
    }

    async fetchData(props) {
      this.setState({ loading: true });
      const url = typeof urlFn === "function" ? urlFn(props) : urlFn;
      if (!url) {
        this.setState({
          data: { ...this.state.data, __falsyurl: true },
          error: "",
          loading: false
        });
        return;
      }
      let res = await window.fetchWithAuth(url);
      if (!res.ok) {
        this.setState({ error: res.statusText, loading: false });
        return;
      }
      res = await res.json();
      if (!res.error) this.setState({ data: res, error: "", loading: false });
      else this.setState({ error: res.error, loading: false });
    }

    render() {
      return (
        <WrappedComponent
          data={this.state.data}
          error={this.state.error}
          loading={this.state.loading}
          refresh={() => this.updateComponent(this.props)}
          {...this.props}
        />
      );
    }
  }
  return ABC;
}

export default dataComponent;
