import React from 'react';
import {Redirect } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout'
import $ from 'jquery';
import '../theme/bower_components/font-awesome/css/font-awesome.min.css';
import '../theme/bower_components/Ionicons/css/ionicons.min.css';
import '../theme/bower_components/jvectormap/jquery-jvectormap.css';
import '../theme/dist/css/AdminLTE.min.css';
import '../theme/dist/css/skins/_all-skins.min.css';
import '../theme/plugins/timepicker/bootstrap-timepicker.min.css';
class Dashboard extends React.Component{
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
    console.log(this.state);
    if (isLoggedIn == false) {
          return <Redirect to='/login'/>;
    }
    return(
          <div className="hold-transition skin-blue sidebar-mini">  
           <DashboardLayout component='DashboardPage'/>
          </div>
        );
    };
}
export default Dashboard;
