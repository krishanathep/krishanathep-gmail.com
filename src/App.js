import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Todos from "./Todos";
import Navbar from "./layouts/Navbar";
import Repairs from "./Repairs";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter basename="/">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Todos} />
            <Route path='/repairs' component={Repairs} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
export default App;
