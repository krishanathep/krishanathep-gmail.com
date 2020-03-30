import React, { Component } from "react";
import firebase from './firebase'

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      item_id: '',
      title: "",
      description: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items')
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val()
      let newState = []
      for (let item in items) {
        newState.push({
          item_id: item,
          title: items[item].title,
          description: items[item].description
        })
      }
      this.setState({
        items: newState
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.item_id !== '') {
      return this.updateItem()
    }

    const itemsRef = firebase.database().ref('items')
    const item = {
      title: this.state.title,
      description: this.state.description
    }

    itemsRef.push(item)
    this.setState({
      item_id: '',
      title: '',
      description: ''
    })
  }

  handleUpdate = (item_id = null , title = null , description = null) => {
    this.setState({ item_id, title, description })
  }

  updateItem() {

    var obj = { title: this.state.title, description: this.state.description }

    const itemsRef = firebase.database().ref('/items')

    itemsRef.child(this.state.item_id).update(obj)

    this.setState({
      item_id: '',
      title: '',
      description: ''
    })
  }

  removeItem(itemId) {
    const itemsRef = firebase.database().ref('/items')
    itemsRef.child(itemId).remove()
  }

  render() {
    return (
      <div className="App">
        <div className="container" align="center">
          <h1>Todo Firestore</h1>
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
                <button type='submit' className="btn btn-primary btn-block">Submit</button>
                </form>
              </div>
              <div className="col-md-12">
                <table className="table table-striped mt-5">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th width='20%'>Actions</th>
                  </tr>
                  {this.state.items.map((item) => {
                    return (
                      <tr>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          <button className='btn btn-success mr-1' onClick={() => this.handleUpdate(item.item_id, item.title, item.description)}>update</button>
                          <button className='btn btn-danger' onClick={() => this.removeItem(item.item_id)}>remove</button>
                        </td>
                      </tr>
                    )
                  })}
                </table>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
export default App;
