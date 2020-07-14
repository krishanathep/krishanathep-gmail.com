import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Repairs from "./components/Repairs";
import Home from "./components/Home";
import Equipments from "./components/Equipments";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter basename="/">
          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/repairs' component={Repairs} />
            <Route path='/equipments' component={Equipments} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
export default App;
