import React from 'react';
import {Redirect } from 'react-router-dom';
import $ from 'jquery';
import DashboardLayout from '../layouts/DashboardLayout'
class AddTheatreSeat extends React.Component{
    constructor(props) {
        super(props);
        const theatreId = props.location.search.slice(1);
        this.state = {
            clicked: false,
            theatre_id:theatreId
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
    const { theatre_id } = this.state;
    if (isLoggedIn == false) {
          return <Redirect to='/login'/>;
    }
    return(
          <div>  
           <DashboardLayout component='AddTheatreSeatPage' id={this.state.theatre_id}/>
          </div>
        );
    };
}
export default AddTheatreSeat;
