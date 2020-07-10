import React, { Component } from "react";
import firebase from "../firebase";

export class Todos extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      item_id: "",
      title: "",
      description: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          item_id: item,
          title: items[item].title,
          description: items[item].description,
        });
      }
      this.setState({
        items: newState,
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

    if(!this.state.title) {
      return alert('Please input data!');
    }

    if(!this.state.description) {
      return alert('Please input data!');
    }

    if (this.state.item_id !== "") {
      return this.updateItem();
    }

    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.title,
      description: this.state.description,
    };
    console.log(item);

    itemsRef.push(item);
    this.setState({
      item_id: "",
      title: "",
      description: "",
    });
  }

  handleUpdate = (item_id = null, title = null, description = null) => {
    this.setState({ item_id, title, description });
  };

  updateItem() {
    var obj = { title: this.state.title, description: this.state.description };

    const itemsRef = firebase.database().ref("/items");

    itemsRef.child(this.state.item_id).update(obj);

    this.setState({
      item_id: "",
      title: "",
      description: "",
    });
  }

  removeItem(itemId) {
    const itemsRef = firebase.database().ref("/items");
    itemsRef.child(itemId).remove();
  }

  resetItem = () => {
    this.setState({
      title: "",
      description: "",
    });
  };

  render() {
    return (
      <div className="Todos">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-info float-right mt-3"
                data-toggle="modal"
                data-target="#createModal"
              >
                <i className="fa fa-plus"></i> CREATE
              </button>
            </div>
            <div className="col-md-12">
              <table className="table table-bordered table-hover mt-1">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th width="30%">Actions</th>
                  </tr>
                </thead>
                {this.state.items.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          <button
                            className="btn btn-info mr-1"
                            onClick={() =>
                              this.handleUpdate(
                                item.item_id,
                                item.title,
                                item.description
                              )
                            }
                            data-toggle="modal"
                            data-target="#viewModal"
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button
                            className="btn btn-success mr-1"
                            onClick={() =>
                              this.handleUpdate(
                                item.item_id,
                                item.title,
                                item.description
                              )
                            }
                            data-toggle="modal"
                            data-target="#updateModal"
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.removeItem(item.item_id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>

              <div class="modal fade" id="createModal">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">Modal Heading</h4>
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="container">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Enter Title..."
                            onChange={this.handleChange}
                            value={this.state.title}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Enter Description..."
                            onChange={this.handleChange}
                            value={this.state.description}
                            required
                          />
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
                      <h4 class="modal-title">Modal Heading</h4>
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="container">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Enter Title..."
                            onChange={this.handleChange}
                            value={this.state.title}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Enter Description..."
                            onChange={this.handleChange}
                            value={this.state.description}
                          />
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
                      <h4 class="modal-title">Modal Heading</h4>
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>

                    <div class="modal-body">
                      <div className="container">
                        <table className="table table-bordered">
                          <tr>
                            <th>Title</th>
                            <td>{this.state.title}</td>
                          </tr>
                          <tr>
                            <th>Description</th>
                            <td>{this.state.description}</td>
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
      </div>
    );
  }
}

export default Todos;
