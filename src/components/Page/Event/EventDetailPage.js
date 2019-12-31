/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import {browserHistory} from 'react-router';
import Constants  from '../../../config/Constants'
import $ from 'jquery';
import EventDetailTab from '../Event/EventDetailTab';
import Breadcrum from '../../BreadcrumPage';
const urlEventStr    = Constants.MEMBERSHIP_PLAN_LIST;
var serialize = require('form-serialize');
const token     = localStorage.getItem('token');

class EventDetailPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id              : this.props.id,
            isMsg           : false,
            className       : '',
            message         : ''

        };
        

    }

    getItinerariesDetails(){
        this.setState({
          isOverlay  : true
        });
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            id        : this.props.id
        }
        axios.post(urlEventStr, formData)
        .then((response) => {
            
          if(response.data.code==200) {
              //console.log(response.data.membership);
              this.setState({
                  membership : response.data.membership,
                  membership_feature:response.data.membership.membership_feature,
                  isOverlay  : false,
              });
              $('.overlay').hide();
          }
          else
          {
            this.setState({isMsg:true});
            this.setState({className:'error'});
          }
        })
        .catch((err) => {
  
        })
      }
      
      componentDidMount(){
        this.getItinerariesDetails();
      }

    render(){
        const {id} = this.state;
        alert("=",id);
        return(
                <div className="content-wrapper">
                {/* Import Breadcrup component boxes here */}
                <Breadcrum title="Event Detail" titleRight="Event List" url="/eventlist"/>
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <EventDetailTab id={id}/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default EventDetailPage;
