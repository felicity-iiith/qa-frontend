import Component from "inferno-component";
import "./registerServiceWorker";

import Navbar from "./Navbar";

class App extends Component {
  render({ children }) {
    return (
      <main className="wrapper">
        <Navbar />
        <section className="container">{children}</section>
      </main>
    );
  }
}

export default App;
