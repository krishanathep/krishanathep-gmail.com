import React, { Component } from "react";
import firebase from '../firebase'
import Moment from "react-moment";
import "moment-timezone";

export class Equipments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments:[],  
      equipment_id: "",
      name: "",
      detail: "",
      category: "",
      date: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      const equipmentRef = firebase.database().ref('equipments')
      equipmentRef.on('value', (snapshot)=>{
          let equipments = snapshot.val();
          let newState = [];
          for (let equipment in equipments) {
              newState.push({
                  equipment_id: equipment,
                  id: equipments[equipment].id,
                  name: equipments[equipment].name,
                  detail: equipments[equipment].detail,
                  category: equipments[equipment].category,
                  date: equipments[equipment].date,
              })
          }
          this.setState({
              equipments: newState
          })
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e){
      e.preventDefault();

      if(!this.state.name){
          return alert('please input name!')
      }

      if (this.state.equipment_id !== "") {
        return this.updateEquipment();
      }

      const equipmentRef = firebase.database().ref('equipments');
      const equipment = {
          name: this.state.name,
          detail: this.state.detail,
          category: this.state.category,
          date: firebase.database.ServerValue.TIMESTAMP,
      }
      equipmentRef.push(equipment);

      this.setState({
          equipment_id: '',
          name: '',
          detail: '',
          category: '',
          date: ''
      })
  }

  handleUpdate=(
      equipment_id = null,
      name = null,
      detail = null,
      category = null,
  ) => { 
      this.setState({ equipment_id, name, detail, category })
  }

  updateEquipment(){
      var obj ={
          name: this.state.name,
          detail: this.state.detail,
          category: this.state.category,
      }
      const eqRef = firebase.database().ref('/equipments')
      eqRef.child(this.state.equipment_id).update(obj)

      this.setState({
          equipment_id: '',
          name: '',
          detail: '',
          category: '',
      })
  }

  onClickDelete(equipment_id){
      if(window.confirm('Are you sure you want to delete this Equipment?')){
          let eqRef = firebase.database().ref('equipments')
          eqRef.child(equipment_id).remove();
      }
  }

  resetItem = () => {
    this.setState({
      name: '',
      detail: "",
      category: "",
    });
  };

  render() {
    var id = 1;
    return (
      <div className="Equipments">
        <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3 mb-3">
            <button
              data-toggle="modal"
              data-target="#createModal"
              className="btn btn-success float-right"
            >
             <i className="fa fa-plus"></i> CREATE
            </button>
          </div>
          <div className="col-md-12">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Detail</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                  {this.state.equipments.map(equipment=>(
                <tr>
                  <td>{id++}</td>
                  <td>{equipment.name}</td>
                  <td>{equipment.detail}</td>
                  <td>{equipment.category}</td>
                  <td><Moment format="DD/MM/YYYY">{equipment.date}</Moment></td>
                  <td>
                      <button 
                      data-toggle="modal" 
                      data-target="#updateModal" 
                      className='btn btn-primary btn-sm mr-1'
                      onClick={()=>this.handleUpdate(
                          equipment.equipment_id,
                          equipment.name,
                          equipment.detail,
                          equipment.category,
                      )}
                      ><i className="fa fa-pencil"></i></button>
                      <button onClick={()=>this.onClickDelete(equipment.equipment_id)} className='btn btn-danger btn-sm'><i className="fa fa-trash"></i></button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            <div class="modal fade" id="createModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">New Equipment</h4>
                    <button type="button" class="close" data-dismiss="modal">
                      &times;
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="">Name :</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Detail :</label>
                            <textarea 
                            className='form-control'
                            name="detail" 
                            cols="30" 
                            rows="5"
                            value={this.state.detail}
                            onChange={this.handleChange}
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Category :</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            name='category'
                            value={this.state.category}
                            onChange={this.handleChange}
                            />
                          </div>
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
                    <h4 class="modal-title">Update Equipment</h4>
                    <button type="button" class="close" data-dismiss="modal">
                      &times;
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="">Name :</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Detail :</label>
                            <textarea 
                            className='form-control'
                            name="detail" 
                            cols="30" 
                            rows="5"
                            value={this.state.detail}
                            onChange={this.handleChange}
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Category :</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            name='category'
                            value={this.state.category}
                            onChange={this.handleChange}
                            />
                          </div>
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
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Equipments;
