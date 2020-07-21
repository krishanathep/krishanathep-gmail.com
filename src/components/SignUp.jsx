import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
    const { email, username, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({ displayName: username }).then(() => {
          this.props.history.push("/home");
        });
      })
      .catch((error) => {
        this.setState({ error });
        alert(error);
      });
  };

  render() {
    const { email, password, username } = this.state;
    return (
      <div className="Sign Up container">
        <div className="row">
          <div class="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
            <div className="col-md-6 offset-md-3">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Sign Up</h3>
                  <div className="card-text">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="">E-Mail Address :</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="E-Mail Address"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Name :</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User Name"
                          name="username"
                          value={username}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Password :</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div>
                        <input
                          type="submit"
                          className="btn btn-primary btn-block"
                          value="Sign Up"
                        />
                      </div>
                      <div className="text-center mt-3">
                        <p>
                          Back to <Link to="/">Sign In</Link>
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

export default SignUp;
