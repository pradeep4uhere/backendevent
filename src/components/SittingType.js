import React from 'react';
import {Redirect } from 'react-router-dom';
import $ from 'jquery';
import DashboardLayout from '../layouts/DashboardLayout'
class SittingType extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        };
        
    }


    componentDidMount() {
      var userId= localStorage.getItem('user');
        if(localStorage.getItem('user')){
          this.setState({ isLoggedIn: true});    
        }else{
          this.setState({ isLoggedIn: false });    
        }
    }


    render(){
    const { isLoggedIn } = this.state
    const { id } = this.state;
    if (isLoggedIn == false) {
          return <Redirect to='/login'/>;
    }
    return(
          <div>  
           <DashboardLayout component='SittingType'/>
          </div>
        );
    };
}
export default SittingType;
