import React, { Component } from "react";
import { Link } from "react-router-dom";

export class LoginPage extends Component {
  render() {
    return (
      <div className="Login Page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="card-title mb-4">Sign In</h3>
                <div className="card-text">
                  <div className="form-group">
                    <label htmlFor="">E-Mail Address :</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password :</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-check mb-3">
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value=""
                      />
                      Remember Me
                    </label>
                  </div>
                  <div>
                    <Link to='/' className="btn btn-primary btn-block btn-lg">
                      Sign In
                    </Link>
                  </div>
                  <div className="text-center mt-3">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/signup">Create One</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
