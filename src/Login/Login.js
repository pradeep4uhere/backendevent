import React from 'react';
import axios from 'axios'
import { Redirect,withRouter } from 'react-router-dom'
import Constants  from '../config/Constants'
import $ from 'jquery';
var sha1 = require('sha1');
var globals = require('node-global-storage');
var cors = require('cors');
const appName = Constants.APP_NAME
const appTag = Constants.APP_TAG
const urlStr = Constants.LOGIN_URL;
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            className: false,
            classNameError: false,
            isLoggedIn: false,
            message:'',
            classstr:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(Constants);
    }



    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var tokenStr = event.target.email_address.value+'|'+event.target.password.value+'|'+Constants.APP_SALT;
        const formData = {
            username : event.target.email_address.value,
            password : event.target.password.value,
            token    : sha1(tokenStr)
        }
        axios.post(urlStr, formData)
          .then((response) => {
          console.log(response.data);
            if(response.data.code==200) {
              //Set All global Values For User After Login
              globals.set('user',response.data.user);
              globals.set('token',response.data.token);
              localStorage.setItem('user',response.data.user.id);
              localStorage.setItem('token',response.data.token);
              this.setState({
                    redirectToReferrer : true,
                    message:response.data.message,
                    classstr:'alert alert-success',
                    className:true
              });
              console.log(this.state);
            }
            else
            {

                this.setState({ 
                    redirectToReferrer: false, 
                    message:response.data.message,
                    classstr:'alert alert-danger'
                });
              
            }
          })
          .catch((err) => {
              console.log("Error: ", err);
              this.setState({ redirectToReferrer: false });
              this.setState({message:err});
              this.setState({classstr:'alert alert-danger'});
          })
    }



    componentDidMount() {
        if(localStorage.getItem('user')){
          this.setState({ redirectToReferrer: true});    
        }else{
          this.setState({ redirectToReferrer: false });    
        }
        $('#ipl-progress-indicator').hide();
    }

   render(){
      const { redirectToReferrer } = this.state;
      const { message } = this.state;
      const { classstr } = this.state;
      console.log(redirectToReferrer);
      if (redirectToReferrer === true) {
        return <Redirect to='/dashboard'/>;
      }
      return(
        <div >
          
          <div className="limiter" >
         
        <div className="container-login100" >
        
          <div className="wrap-login100">
            <div className="login100-form-title" style={{backgroundImage: 'url(../rudra/images/home-banner.jpg)'}}>
              <span className="login100-form-title-1">
               Sign In
              </span>
              
            </div>
            <center>
           {message ? (<div className={this.state.classstr}>{this.state.message}</div>) : (<div></div>)}
        </center>
            <form className="login100-form validate-form" onSubmit={this.handleSubmit} id="login-form" >
           
              <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                <span className="label-input100">Username</span>
                <input className="input100" type="text" placeholder="Enter your username / email" id="email_address" name="email_address" />
                <span className="focus-input100" />
              </div>
              <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                <span className="label-input100">Password</span>
                <input className="input100" type="password" placeholder="Enter your password" name="password" id="password" />
                <span className="focus-input100" />
              </div>
              <div className="flex-sb-m w-full p-b-30">
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#" className="txt1">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="container-login100-form-btn">
                
                <input type="submit" name="submit" className="login100-form-btn" value="Sign In"/>
              </div>
            </form>
            
          </div>
        </div>
      </div>
      
      </div>
      );
    };
}
let userId = globals.get('Id');
export const user = userId;
export default Login;