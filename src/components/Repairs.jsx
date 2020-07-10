import React, { Component } from "react";
import firebase from "firebase";
import Moment from "react-moment";
import "moment-timezone";

export class Repairs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repairs: [],
      repair_id: "",
      id: "ROS-",
      job: "",
      detail: "",
      staff: "",
      date: "",
      status: "Waiting",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const repairRef = firebase.database().ref("repairs");
    repairRef.on("value", (snapshot) => {
      let repairs = snapshot.val();
      let newState = [];
      for (let repair in repairs) {
        newState.push({
          repair_id: repair,
          id: repairs[repair].id,
          job: repairs[repair].job,
          detail: repairs[repair].detail,
          staff: repairs[repair].staff,
          date: repairs[repair].date,
          status: repairs[repair].status,
        });
      }
      this.setState({
        repairs: newState,
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.job) {
      return alert("Please input data!");
    }

    if (this.state.repair_id !== "") {
      return this.updateRepair();
    }

    const repairRef = firebase.database().ref("repairs");
    const repair = {
      id: this.state.id,
      job: this.state.job,
      detail: this.state.detail,
      staff: this.state.staff,
      date: firebase.database.ServerValue.TIMESTAMP,
      status: this.state.status,
    };

    repairRef.push(repair);

    this.setState({
      repair_id: "",
      id: "",
      job: "",
      detail: "",
      staff: "",
      date: "",
    });
  }

  handleUpdate = (
    repair_id = null,
    id = null,
    job = null,
    detail = null,
    staff = null,
    date = null,
    status = null
  ) => {
    this.setState({ repair_id, id, job, detail, staff, date, status });
  };

  updateClick() {
    alert(this.state.repair_id);
  }

  updateRepair() {
    var obj = {
      id: this.state.id,
      job: this.state.job,
      detail: this.state.detail,
      staff: this.state.staff,
      date: this.state.date,
      status: this.state.status,
    };
    const repairRef = firebase.database().ref("/repairs");

    repairRef.child(this.state.repair_id).update(obj);

    this.setState({
      repair_id: "",
      id: "",
      job: "",
      detail: "",
      staff: "",
      date: "",
    });
  }

  onClickDelete(repair_id) {
    let repairRef = firebase.database().ref("repairs");
    repairRef.child(repair_id).remove();
  }

  resetItem = () => {
    this.setState({
      id: "",
      job: "",
      detail: "",
      staff: "",
      date: "",
    });
  };

  render() {
    return (
      <div className="Repairs container">
        <div className="row">
          <div className="col-md-12 mt-3">
            <button
              data-toggle="modal"
              data-target="#createModal"
              className="btn btn-success mb-3 float-right"
            >
              <i className="fa fa-plus"></i> CREATE
            </button>
          </div>
          <div className="col-md-12">
            <table className="table table-hover table-bordered">
              <thead>
                <tr align="center">
                  <th>Job ID</th>
                  <th>Equipment</th>
                  <th>Detail</th>
                  <th>Staff</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.repairs.map((repair) => (
                  <tr key={repair.id}>
                    <td>{repair.id}</td>
                    <td>{repair.job}</td>
                    <td>{repair.detail}</td>
                    <td>{repair.staff}</td>
                    <td>
                    {(() => {
                        switch(repair.status){
                          case 'Waiting': return <span className='badge badge-danger'>{repair.status}</span>
                          case 'Finish': return <span className='badge badge-success'>{repair.status}</span>
                        }
                      })()}
                    </td>
                    <td>
                      <Moment format="DD/MM/YYYY">{repair.date}</Moment>
                    </td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        data-toggle="modal"
                        data-target="#viewModal"
                        onClick={() =>
                          this.handleUpdate(
                            repair.repair_id,
                            repair.id,
                            repair.job,
                            repair.detail,
                            repair.staff,
                            repair.date,
                            repair.status
                          )
                        }
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        data-toggle="modal"
                        data-target="#updateModal"
                        onClick={() =>
                          this.handleUpdate(
                            repair.repair_id,
                            repair.id,
                            repair.job,
                            repair.detail,
                            repair.staff,
                            repair.date,
                            repair.status
                          )
                        }
                        className="btn btn-primary btn-sm mr-1 ml-1"
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button
                        onClick={() => this.onClickDelete(repair.repair_id)}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="modal fade" id="createModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Create Repair Job</h4>
                    <button type="button" class="close" data-dismiss="modal">
                      &times;
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label htmlFor="">ID :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="id"
                            onChange={this.handleChange}
                            value={this.state.id}
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label for="sel1">Job :</label>
                          <select
                            class="form-control"
                            id="sel1"
                            name="job"
                            onChange={this.handleChange}
                            value={this.state.job}
                          >
                            <option>Select...</option>
                            <option>Computer</option>
                            <option>Software</option>
                            <option>Printer</option>
                            <option>Network</option>
                          </select>
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="">Detail :</label>
                          <textarea
                            name="detail"
                            cols="30"
                            rows="5"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.detail}
                          ></textarea>
                        </div>
                        <div className="col-md-6 form-group">
                          <label htmlFor="">Staff</label>
                          <input
                            type="text"
                            className="form-control"
                            name="staff"
                            onChange={this.handleChange}
                            value={this.state.staff}
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label htmlFor="">Status :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="status"
                            onChange={this.handleChange}
                            value={this.state.status}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button
                      onClick={this.handleSubmit}
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={this.resetItem}
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="updateModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Update Repair Job</h4>
                    <button type="button" class="close" data-dismiss="modal">
                      &times;
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label htmlFor="">ID :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="id"
                            onChange={this.handleChange}
                            value={this.state.id}
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label for="sel1">Job :</label>
                          <select
                            class="form-control"
                            id="sel1"
                            name="job"
                            onChange={this.handleChange}
                            value={this.state.job}
                          >
                            <option>Computer</option>
                            <option>Software</option>
                            <option>Printer</option>
                            <option>Network</option>
                          </select>
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="">Detail :</label>
                          <textarea
                            name="detail"
                            cols="30"
                            rows="5"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.detail}
                          ></textarea>
                        </div>
                        <div className="col-md-6 form-group">
                          <label htmlFor="">Staff</label>
                          <input
                            type="text"
                            className="form-control"
                            name="staff"
                            onChange={this.handleChange}
                            value={this.state.staff}
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label for="sel1">Status :</label>
                          <select
                            class="form-control"
                            id="sel1"
                            name="status"
                            onChange={this.handleChange}
                            value={this.state.status}
                          >
                            <option>Waiting</option>
                            <option>Finish</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button
                      data-dismiss="modal"
                      onClick={this.handleSubmit}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={this.resetItem}
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="viewModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">View Repair Job</h4>
                    <button type="button" class="close" data-dismiss="modal">
                      &times;
                    </button>
                  </div>

                  <div class="modal-body">
                    <div className="container">
                      <table className="table table-bordered">
                        <tr>
                          <th>Job ID</th>
                          <td>{this.state.id}</td>
                        </tr>
                        <tr>
                          <th>Repair</th>
                          <td>{this.state.job}</td>
                        </tr>
                        <tr>
                          <th>Detail</th>
                          <td>{this.state.detail}</td>
                        </tr>
                        <tr>
                          <th>Staff</th>
                          <td>{this.state.staff}</td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td>
                            <Moment format="DD/MM/YYYY">
                              {this.state.date}
                            </Moment>
                          </td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>{this.state.status}</td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={this.resetItem}
                      data-dismiss="modal"
                    >
                      Close
                    </button>
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

export default Repairs;
