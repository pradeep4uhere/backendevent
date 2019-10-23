import React from 'react';
import {Redirect } from 'react-router-dom';
import $ from 'jquery';
import DashboardLayout from '../layouts/DashboardLayout'
class EventGallery extends React.Component{
    constructor(props) {
        super(props);
        const id = props.location.search.slice(1);
        this.state = {
            clicked: false,
            id:id
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
    const { id } = this.state
    console.log(this.state);
    if (isLoggedIn == false) {
          return <Redirect to='/login'/>;
    }
    return(
          <div>  
           <DashboardLayout component='EventGalleryPage' id={id}/>
          </div>
        );
    };
}
export default EventGallery;
