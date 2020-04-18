import React, { Component } from "react";
import firebase from "./firebase";
import Navbar from "./layouts/Navbar";

class App extends Component {
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

    if (this.state.item_id !== "") {
      return this.updateItem();
    }

    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.title,
      description: this.state.description,
    };

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

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container" align="center">
          <h1 className="mt-3">Todo Firestore</h1>
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit}>
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
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-md-12">
              <table className="table table-bordered mt-5">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th width="30%">Actions</th>
                </tr>
                {this.state.items.map((item) => {
                  return (
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
                          View
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
                        >
                          update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.removeItem(item.item_id)}
                        >
                          remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            
              <div class="modal" id="viewModal">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">Modal Heading</h4>
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>

                    <div class="modal-body">
                      <div className='container'>
                        <table className='table table-bordered'>
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
export default App;
