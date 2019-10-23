import React from 'react';
import axios from 'axios'
import { Redirect,withRouter } from 'react-router-dom'
import $ from 'jquery';
import '../theme/bower_components/bootstrap/dist/css/bootstrap.min.css';
import Constants  from '../config/Constants'
var sha1 = require('sha1');
var globals = require('node-global-storage');
var cors = require('cors');
const appName = Constants.APP_NAME
const appTag = Constants.APP_TAG
const urlStr = Constants.REGISTER_URL;

class Register extends React.Component{
    constructor() {
        super();
        this.state = {
                redirectToReferrer  : false,
                className           : false,
                classNameError      : false,
                isLoggedIn          : false,
                message             : '',
                classstr            : '',
                errors              : {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.errorPrint = this.errorPrint.bind(this);
    }

    /**********Registration Form Handle Start Here********************/
    handleSubmit(event) {
      event.preventDefault();

      //Generate the token here
      var firstName     = event.target.fname.value;
      var lastName      = event.target.lname.value;
      var username      = event.target.username.value;
      var emailAddress  = event.target.email_address.value;
      var password      = event.target.password.value;
      var cpassword     = event.target.cpassword.value;
      var tokenStr      = firstName+'|'+lastName+'|'+username+'|'+emailAddress+'|'+password+'|'+cpassword+'|'+Constants.APP_SALT; 
      const formData = {
            firstName     : firstName,
            lastName      : lastName,
            username      : username,
            emailAddress  : emailAddress,
            password      : password,
            cpassword     : cpassword,
            token         : sha1(tokenStr),
            errorFlag     : false
      }
      axios.post(urlStr, formData)
        .then((response) => {
          //console.log(response.data);
          if(response.data.code==200) {
            //Set All global Values For User After Login
            globals.set('user',response.user);
            globals.set('token',response.token);
            //localStorage.setItem('user',response.data.user.id);
            if(response.data.status=='success'){
              this.setState({
                    classstr          :'alert alert-success',
                    className         :true,
                    errorFlag         : false,
                    message           : response.data.message
              });  

              setTimeout(() => {
                    this.setState({
                      redirectToReferrer: true,
                    })
                }, 2000)
                
            }else{
              this.setState({
                message   : response.data.message,
                classstr  : 'alert alert-danger',
                className : true,
                errorFlag : true
              });
            }
          }
          else
          {
              this.setState({ 
                  redirectToReferrer  : false, 
                  message             : response.data.message,
                  classstr            : 'alert alert-danger',
                  errors              : response.data.error,
                  errorFlag           : true
              });
            
          }
        })
        .catch((err) => {
            this.setState({redirectToReferrer: false });
            this.setState({message:err});
            this.setState({classstr:'alert alert-danger'});
        })
  }
  /**********Registration Form Handle Ends Here********************/

    errorPrint() {
        let error = this.state.errors;
        let errorMsg = [];
        if(this.state.errorFlag){
          if(error!=null){
            errorMsg.push(<span className='errorMessage'>Error: {this.state.message}</span>)
            Object.keys(error).map(function(key) {
              errorMsg.push(<span className='errorMessage'>{error[key][0]}</span>)
            });
            return errorMsg;
          } 
      }else{
        errorMsg.push(<span>Success:{this.state.message}</span>)
        return errorMsg;
      }
    }

    render(){
      const { redirectToReferrer } = this.state;
      const { classstr } = this.state;
      const { message } = this.state;
      console.log(classstr);
      if (redirectToReferrer === true) {
        return <Redirect to='/login'/>;
      }
      return(
      <div className="register-box">
        <div className="register-logo">
          <a href="#"><b>{appName}</b>{appTag}</a>
        </div>
        <div className="register-box-body">
        <center>
          {message ? (<div className={this.state.classstr}>{this.errorPrint()}</div>) : (<div></div>)}

        </center>
          <p className="login-box-msg">Register a new membership</p>
          <form id="register-from" onSubmit={this.handleSubmit}>
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="First Name" id="fname" />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Last Name" id="lname" />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Enter Username"  id="username"/>
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Enter Email Address"  id="email_address"/>
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" id="password"/>
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Retype password" id="cpassword"/>
              <span className="glyphicon glyphicon-log-in form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <dt>
                    <input type="checkbox"  required id="terms"/> I agree to the <a href="#">Terms & Cond.</a>
                  </dt>
                </div>
              </div>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
              </div>
            </div>
          </form>
          <a href="login" className="text-center">I already have a membership</a>
        </div>
      </div>
      );
    };
}
export default Register;