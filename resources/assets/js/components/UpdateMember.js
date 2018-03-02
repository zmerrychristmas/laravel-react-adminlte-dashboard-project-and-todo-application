import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class UpdateMember extends Component {
  constructor(props) {
    super(props);
    this.state = {memberName: '', memberInformation: '', memberPhone: '', memberDob: '', memberPosition: 'intern', memberGender: '1', memberAvatar: null};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeInformation = this.handleChangeInformation.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeDob = this.handleChangeDob.bind(this);
    this.handleChangePosition = this.handleChangePosition.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(MyGlobleSetting.url + `/api/members/${this.props.params.id}`)
    .then(response => {
      this.setState({ memberName: response.data.name, memberInformation: response.data.information, memberPhone: response.data.phone, memberDob: response.data.date_of_birth, memberPosition: response.data.position, memberGender: response.data.gender, memberAvatar: response.data.avatar });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  handleChangeName(e){
    this.setState({
      memberName: e.target.value
    })
  }
  handleChangeInformation(e){
    this.setState({
      memberInformation: e.target.value
    })
  }
  handleChangePhone(e){
    this.setState({
      memberPhone: e.target.value
    })
  }
  handleChangeDob(e){
    this.setState({
      memberDob: e.target.value
    })
  }
  handleChangePosition(e){
    this.setState({
      memberPosition: e.target.value
    })
  }
  handleChangeGender(e){
    console.log(e.target)
    this.setState({
      memberGender: e.target.value
    })
  }
  handleChangeAvatar(e){
    console.log(e.target.files[0]);
    this.setState({
      memberAvatar: e.target.files[0]
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const products = {
      title: this.state.title,
      body: this.state.body
    }
    let uri = MyGlobleSetting.url + '/api/products/'+this.props.params.id;
    axios.patch(uri, products).then((response) => {
          this.props.history.push('/');
    });
  }
  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal"  method="post" enctype="multipart/form-data" >
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input type="text" value={this.state.memberName} className="form-control" id="name" onChange={this.handleChangeName} name="name" placeholder="Enter name" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Avatar:</label>
            <div className="col-sm-10">
              <input type="file" onChange={this.handleChangeAvatar} ref={this.state.memberAvatar} className="form-control" id="avatar" name="avatar"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="information">Information:</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="information" onChange={this.handleChangeInformation} name="information">{this.state.memberInformation}</textarea>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="phone">Phone:</label>
            <div className="col-sm-10">
              <input type="text" onChange={this.handleChangePhone} value={this.state.memberPhone} className="form-control" id="phone" name="phone" placeholder="Enter Phone" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="date_of_birth">Date of birth:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" onChange={this.handleChangeDob} id="date_of_birth" name="date_of_birth" placeholder="Enter Date of birth" value={this.state.memberDob} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="position">Position:</label>
            <div className="col-sm-10">
              <select className="form-control" value={this.state.memberPosition} name="position" id="position" onChange={this.handleChangePosition}>
                <option value="intern">intern</option>
                <option value="junior">junior</option>
                <option value="senior">senior</option>
                <option value="pm">pm</option>
                <option value="ceo">ceo</option>
                <option value="cto">cto</option>
                <option value="bo">bo</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="gender">Gender:</label>
            <div className="col-sm-10">
              <select className="form-control" name="gender" value={this.state.memberGender} onChange={this.handleChangeGender} id="gender">
                <option value="1">male</option>
                <option value="2">female</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Update</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default UpdateMember;