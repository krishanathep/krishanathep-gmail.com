import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.history.push("/home");
        console.log("Hello", user);
      })
      .catch((error) => {
        this.setState({ error });
        alert(error);
      });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="Login Page container">
        <div className="row">
          <div class="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
            <div className="col-md-6 offset-md-3">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Sign In</h3>
                  <div className="card-text">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="">E-Mail Address :</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                          placeholder="E-mail Address"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Password :</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                          placeholder="Password"
                        />
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
                        <input
                          type="submit"
                          className="btn btn-primary btn-block"
                          value="Sign In"
                        />
                      </div>
                      <div className="text-center mt-3">
                        <p>
                          Don't have an account?{" "}
                          <Link to="/signup">Create One</Link>
                        </p>
                      </div>
                    </form>
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
