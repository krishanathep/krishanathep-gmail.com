import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase, { auth } from "../firebase";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  logOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then((window.location = "/"));
  };

  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
          <div className="container">
            <Link to="/home" className="navbar-brand">
              <i className="fa fa-tools"></i>&nbsp;
              <strong> REPAIR SYSTEM ONLINE</strong>
            </Link>

            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/repairs">
                    REPAIRS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/equipments">
                    EQUIPMENTS
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="navbardrop"
                    data-toggle="dropdown"
                  >
                    <i className="fa fa-user"></i>
                  </Link>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item">
                      {this.state.user.displayName}
                    </Link>
                    <Link onClick={this.logOutUser} className="dropdown-item">
                      Sing Out
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
