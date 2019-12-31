/*
 * @PageName    :: ItinerariesDepatureTimingPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 18 Oct 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../config/Constants'
import Breadcrum from '../BreadcrumPage';
import 'sweetalert/dist/sweetalert.css';
import "react-tabs/style/react-tabs.css";
import EventTimingPage from './Event/EventTimingViewPage';
import EventGalleryViewPage from './Event/EventGalleryViewPage';
import Moment from 'react-moment';  
const urlStr    = Constants.EVENT_DETAILS_URL;
const token     = localStorage.getItem('token');
var serialize = require('form-serialize');
class TravelViewPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          id : this.props.id,
          event_id  : '',
          event : {},
          isTabOn : false,
          eventLanguage: '',
          eventDetails: [],
          city_name:'',
          state_name:'',
          country_name:'',

        };
        this.getEventDetails= this.getEventDetails.bind(this);
    }




    getEventDetails(){
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            event_id  : this.props.id
        }
        axios.post(urlStr, formData)
        .then((response) => {
          //console.log(response.data[0].data);
          var responseText = response.data[0]; 
         
          if(responseText.code=='200') {
            console.log(responseText);
                this.setState({
                    event    : responseText.data,
                    event_id : response.data.id,
                    eventDetails:responseText.data.event_detail[0],
                    isTabOn : true,
                    eventLanguage: responseText.data.event_detail[0].language.language_name,
                    city_name: responseText.data.event_detail[0].city.city_name,
                    state_name: responseText.data.event_detail[0].state.state_name,
                    country_name: responseText.data.event_detail[0].country.name,

                });
                $('.overlay').hide();
                console.log(this.state.eventLanguage)
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
     const { event }       = this.state;
     const { isTabOn }     = this.state;
     const {id}            = this.state;
     const {eventLanguage} = this.state;
     const {eventDetails}  = this.state;
     const {country_name}  = this.state;
     const {city_name}     = this.state;
     const {state_name}    = this.state;
     return(
        <div className="content-wrapper">
        <section className="content">
        <div className="row">
        <div className="col-md-12">
        <div className="box box-solid">
        {/* <div class="overlay">
                  <i class="fa fa-refresh fa-spin"></i>
        </div> */}
          <div className="box-header with-border">
            <i className="fa fa-film" />
            <h3 className="box-title">Event Details</h3>
          </div>
          <div className="box-body">
          <div className="row">
            <div className="col-md-8">
            <table className="table table-striped" style={{'font-size':'12px'}}>
            <tbody>
                <tr>
                  <td><dt>Event Name</dt></td>
                  <td>{this.state.event.title}</td>
                </tr>
                <tr>
                  <td><dt>Description</dt></td>
                  <td>{this.stripHtml(event.description)}</td>
                </tr>
                <tr>
                  <td><dt>Duration</dt></td>
                  <td>{event.durration}</td>
                </tr>
              </tbody>
            </table>
            </div>
            </div>
            </div>
           
            <div className="box-header with-border">
            <i className="fa fa-map-marker" />
            <h3 className="box-title">Event Location</h3>
            </div>

            <div className="box-body">
            <div className="row">
            <div className="col-md-8">
            <table className="table table-striped" style={{'font-size':'12px'}}>
            <tbody>
                <tr>
                  <td><dt>City Name</dt></td>
                  <td>{city_name}</td>
                </tr>
                <tr>
                  <td><dt>State Name</dt></td>
                  <td>{state_name}</td>
                </tr>
                <tr>
                  <td><dt>Country Name</dt></td>
                  <td>{country_name}</td>
                </tr>
              </tbody>
            </table>
            </div>
            </div>
            </div>


             <div className="box-header with-border">
             <i className="fa fa-language" />
             <h3 className="box-title">Event Language</h3>
             
             </div>
             <div className="box-body">
            <div className="row">
            <div className="col-md-8">
            <table className="table table-striped" style={{'font-size':'12px'}}>
            <tbody>
                <tr>
                  <td><dt>Event Language </dt></td>
                  <td>{eventLanguage}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                </tr>
              </tbody>
            </table>
            </div>
            </div>
            </div>
            


             <div className="box-header with-border">
             <i className="fa fa-clock-o" />
             <h3 className="box-title">Event Show Timing</h3>
             </div>

             <div className="box-body">
             <EventTimingPage id={id}/>
            </div>



            <div className="box-header with-border">
             <i className="fa fa-clock-o" />
             <h3 className="box-title">Event Gallery</h3>
             </div>

             <div className="box-body">
             <EventGalleryViewPage id={id}/>
            </div>

            
            </div>
         </div>
        </div>
        </section></div>
            )
            
    };


   
    
}

export default TravelViewPage;