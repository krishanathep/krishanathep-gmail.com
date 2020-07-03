import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
            <i className="fa fa-tools"></i>&nbsp;<strong> REPAIR SYSTEM ONLINE</strong>
            </Link>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link
                  className="nav-link"
                  to='/'
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to='/repairs'
                >
                  REPAIRS
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
