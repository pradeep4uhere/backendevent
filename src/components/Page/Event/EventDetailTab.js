/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../../config/Constants'
import InformationTab from '../Event/InformationTab';
import LocationTab from '../Event/LocationTab';
import ImageGalleryTab from '../Event/ImageGalleryTab';
import EventTimingTab from '../Event/EventTimingTab';
import SeatingTab from '../Event/SeatingTab';
const urlStr    = Constants.EVENT_DETAILS_URL;
const token     = localStorage.getItem('token');
const event_id  = localStorage.getItem('event_id');
class EventDetailTab extends React.Component{
    constructor() {
        super();
        this.state = {
            event_id  : '',
            event : {},
            isTabOn : false
        };
        this.getEventDetails    = this.getEventDetails.bind(this);
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
          if(response.code===200) {
                this.setState({
                    event    : response.data,
                    event_id : response.data.id,
                    eventDetails:response.data.event_detail,
                    isTabOn : true
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
        const { isTabOn } =  this.state;
        console.log(event.event_detail);

        return(
            <section className="content">
                <div className="row">
                <div className="tab_container ">
                    <input id="tab1" type="radio" name="tabs" defaultChecked />
                    <section id="content1" className="tab-content">
                    <InformationTab/>
                    </section>
                </div>
            </div>
      </section>
      );
    };
}

export default EventDetailTab;
