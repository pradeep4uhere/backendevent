/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import $ from 'jquery';
const urlStr    = Constants.EVENT_DETAILS_URL;
const token     = localStorage.getItem('token');
const event_id  = localStorage.getItem('event_id');
class InformationTab extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          event : {
            event_detail: [],
          }
        };
        this.getUserList    = this.getEventDetails.bind(this);
        this.stripHtml      = this.stripHtml.bind(this);
    }

    getEventDetails(){
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            event_id  : event_id
        }
        axios.post(urlStr, formData)
        .then((response) => {
          var response = response.data[0];          
          if(response.code==200) {
                this.setState({
                    event    : response.data,
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
            this.setState({isMsg:true});
            this.setState({className:'error'});
        })
    }

    componentDidMount(){
      this.getEventDetails();
    }


    stripHtml(html){
      // Create a new div element
      var temporalDivElement = document.createElement("div");
      // Set the HTML content with the providen
      temporalDivElement.innerHTML = html;
      // Retrieve the text property of the element (cross-browser support)
      return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }


    render(){
      const { event } =  this.state;
      let eventDetails = event.event_detail;
      let detailsTimings = '';
      let detailsLocation = eventDetails.map((val,i) =>
          <div className="box-body">
          <dl>
             <p>City::{val.city.city_name}</p>
             <p>State::{val.state.state_name}</p>
             <p>Country::{val.country.name}</p>
          </dl>
          </div>
      );

      let detailsLanguage = eventDetails.map((val,i) =>
        <div className="box-body">
        <dl>
          <p>Language::{val.language.language_name}</p>
        </dl>
        </div>
      );



      let detailsTiming = eventDetails.map((val,i) =>
          val.event_timing.map((key,k)=> 
          <tr>
            <td>{k+1}</td>
            <td>{key.theatre.theater_name}</td>
            <td>{key.theatre.address}</td>
            <td>{key.theatre.company_name}</td>
            <td>{key.theatre.contact_number}</td>
            <td>{key.theatre.email_address}</td>
            <td>{key.event_time}</td>
            <td>Status</td>
          </tr>
          )
      );


      

      return(
            <div className="row">
            <div className="col-md-12">
            <div className="box box-solid">
            <div class="overlay">
                      <i class="fa fa-refresh fa-spin"></i>
            </div>
              <div className="box-header with-border">
                <i className="fa fa-film" />
                <h3 className="box-title">Event Details</h3>
              </div>
                <div className="box-body">
                    <dl>
                    <dt>Title</dt>
                    <p>{event.title}</p>
                    <dt>Description</dt>
                    <p>{this.stripHtml(event.description)}</p>
                    <dt>Durration</dt>
                    <p>{event.durration}</p>
                    <dt>Status</dt>
                    <p>
                     {
                       (event.status==1)?("Active"):("Inactive")
                     } 
                    </p>
                    </dl>
                </div>
                <div className="box-header with-border">
                <i className="fa fa-map-marker" />
                <h3 className="box-title">Event Location</h3>
                </div>
                 {detailsLocation}


                 <div className="box-header with-border">
                 <i className="fa fa-language" />
                 <h3 className="box-title">Event Language</h3>
                 </div>
                 {detailsLanguage}


                 <div className="box-header with-border">
                 <i className="fa fa-language" />
                 <h3 className="box-title">Event Show Timing</h3>
                 </div>

                 <div className="box-body  no-padding">
                 <table className="table table-striped">
                 <tr>
                  <th style={{width: '10px','padding':'10px','background-color':'#dedede'}}>#</th>
                  <th style={{width: '10px','padding':'10px','background-color':'#dedede'}}>Theater Name</th>
                  <th style={{width: '10px','padding':'10px','background-color':'#dedede'}}>Address</th>
                  <th style={{width: '10px','padding':'10px','background-color':'#dedede'}}>Company Name</th>
                  <th style={{width: '10px','padding':'10px','background-color':'#dedede'}}>Contact Number</th>
                  <th style={{width: '10px','padding':'10px','background-color':'#dedede'}}>Email Address</th>
                  <th style={{width: '10px','padding':'10px','background-color':'#dedede'}}>Event Time</th>
                  <th style={{width: '10px','padding':'10px','background-color':'#dedede'}}>Status</th>
                 </tr>
                 <tbody>
                 {detailsTiming}
                 </tbody>
                 </table>
                </div>
                </div>
             </div>
            </div>
      );
    };
}

export default InformationTab;