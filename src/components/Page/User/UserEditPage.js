/*
 * @PageName    :: UserEditPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for udapte of user details
 * @params      :: Props as user object directly getting from the parnet component
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import $ from 'jquery';
const urlStr = Constants.USER_UPDATE_URL;
const token     = localStorage.getItem('token');
class UserEditPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userDetails     : this.props.user,
            first_name      : this.props.user.first_name,
            last_name       : this.props.user.last_name,
            username        : this.props.user.username,
            email           : this.props.user.email,
            status          : this.props.user.status,
            isMsg           : true,
            className       : '',
            message         : ''

        };
        this.handleEditSubmit   = this.handleEditSubmit.bind(this);
        this.handleChange       = this.handleChange.bind(this);

    }
    /**********Login Form Handle********************/
    handleEditSubmit(event) {
        event.preventDefault();
        $('#subtn').html("Please wait...");
        var id  = event.target.id.value;
        var first_name  = event.target.first_name.value;
        var last_name   = event.target.last_name.value;
        var username    = event.target.username.value;
        var email    = event.target.email.value;
        var status    = event.target.status.value;
        const formData = {
            user        : {
                id          : id,
                first_name  : first_name,
                last_name   : last_name,
                username    : username,
                email       : email,
                status      : status
            },
            token       : token
        }
        axios.post(urlStr, formData)
          .then((response) => {
            if(response.data.data.code==200) {
              this.setState({
                    message     : response.data.data.message,
                    classstr    : 'alert alert-success',
                    className   : 'success',
                    isMsg       : true,
              });
              $('#subtn').html("Update");
            }
            else
            {
                this.setState({ 
                    message:response.data.data.message,
                    className   : 'error',
                    classstr    : 'alert alert-danger',
                    isMsg       : true,
                });
              
            }
          })
          .catch((err) => {
              console.log("Error: ", err);
              this.setState({message    :   err});
              this.setState({className  :   'error'});
              this.setState({isMsg      :   true});
              this.setState({classstr      :   'alert alert-danger'});
          })
    }

    handleChange(e) {
        var strid = e.target.id;
        if(strid=='first_name'){
            this.setState({first_name : e.target.value});
        }
        if(strid=='last_name'){
            this.setState({last_name : e.target.value});
        }
        if(strid=='email'){
            this.setState({email : e.target.value});
        }
        if(strid=='username'){
            this.setState({username : e.target.value});
        }
        if(strid=='status'){
            this.setState({status : e.target.value});
        }
    }


    render(){
        const { userDetails }   = this.state;
        const { isMsg }         = this.state;
        const { className }     = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;
        console.log(this.state);
        return(
            <div className="row">
            <div className="col-md-12">

            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">User Details Update</h3>
                </div>
                <div className="box-body">
                <form className="form-horizontal" onSubmit={this.handleEditSubmit} id="login-form" >
                    <div className="box-body">
                    <div className="form-group">
                        <dt htmlFor="inputEmail3" className="col-sm-3 control-label">First Name</dt>
                        <div className="col-sm-9">
                        <input type="text" className="form-control" id="first_name" placeholder="Enter first name" value={this.state.first_name} onChange = { this.handleChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <dt htmlFor="inputEmail3" className="col-sm-3 control-label">Last Name</dt>
                        <div className="col-sm-9">
                        <input type="text" className="form-control" id="last_name" placeholder="Enter last name" value={this.state.last_name} onChange = { this.handleChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <dt htmlFor="inputEmail3" className="col-sm-3 control-label">Username</dt>
                        <div className="col-sm-9">
                        <input type="text" className="form-control" id="username" placeholder="Enter username" value={this.state.username} onChange = { this.handleChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <dt htmlFor="inputEmail3" className="col-sm-3 control-label">Email Address</dt>
                        <div className="col-sm-9">
                        <input type="email" className="form-control" id="email" placeholder="Enter email address" value={this.state.email} onChange = { this.handleChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <dt htmlFor="inputEmail3" className="col-sm-3 control-label">Status</dt>
                        <div className="col-sm-9">
                            <select className="form-control" id="status" onChange = { this.handleChange.bind(this)}>
                                <option value="1">Active</option>
                                <option value="0">In Active</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                    <button type="button" className="btn btn-default">Cancel</button>
                    <button type="submit" className="btn btn-info pull-right" id="subtn">Update</button>
                    </div>
                    {/* /.box-footer */}
                    <input type="hidden" id="id" value={userDetails.id}/>
                </form>
                </div>
            </div>
            
        </div>
        </div>
      );
    };
}
export default UserEditPage;
