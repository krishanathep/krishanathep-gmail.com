import React, { Component } from "react";
import { Link } from 'react-router-dom'

export class SignUp extends Component {
  render() {
    return (
      <div className="Sign Up container">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="card-title mb-4">Sign Up</h3>
                <div className="card-text">
                  <div className="form-group">
                    <label htmlFor="">E-Mail Address :</label>
                    <input type="text" className="form-control" placeholder='Enter your E-mail...' />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Name :</label>
                    <input type="text" className="form-control" placeholder='Enter your Name...' />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password :</label>
                    <input type="text" className="form-control" placeholder='Enter your Password...' />
                  </div>
                  <div>
                    <button className="btn btn-primary btn-block btn-lg">
                      Sign Up
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <p>
                      Back to <Link to='/login'>Sign In</Link>
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

export default SignUp;
