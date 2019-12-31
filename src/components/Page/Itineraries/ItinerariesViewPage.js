/*
 * @PageName    :: ItinerariesDepatureTimingPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 18 Oct 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../../config/Constants';
import Breadcrum from '../../BreadcrumPage';
import 'sweetalert/dist/sweetalert.css';
import "react-tabs/style/react-tabs.css";
import Moment from 'react-moment';  
import AllItinerariesDaysViewList from './AllItinerariesDaysViewList';
import ItinerariesAddOnViewPage from './ItinerariesAddOnViewPage';
import ItinerariesTermsViewPage from './ItinerariesTermsViewPage';
import ItinerariesDepatureTimingViewPage from './ItinerariesDepatureTimingViewPage';
import ItinerariesGalleryViewPage from './ItinerariesGalleryViewPage';
import ItinerariesDayGalleryViewPage from './ItinerariesDayGalleryViewPage';

const urlEventStr    = Constants.ITINERARIES_URL;
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
          title:'',
          status:''

        };
        this.getItinerariesDetails= this.getItinerariesDetails.bind(this);
    }


    getItinerariesDetails(){
        this.setState({
          isOverlay  : true
        });
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            event_id  : this.props.id
        }
        //alert(formData.event_id);
        axios.post(urlEventStr, formData)
        .then((response) => {
          if(response.data[0].code==200) {
              this.setState({
                  event_detail: response.data[0].data,
                  trip_type   : response.data[0].data.trip_type,
                  description : response.data[0].data.description,
                  title       : response.data[0].data.title,
                  status       : response.data[0].data.status,
                  isOverlay   : false,  
              });
              console.log(this.state.event_detail);
              $("#title").val(this.state.event_detail.title);
              $("#description").val(this.state.description);
              $("#trip_type").val(this.state.trip_type);
              $("#status").val(this.state.event_detail.status);
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

    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
      }
  



    
    render(){
     const {id}          =   this.state;
     return(
        <div className="content-wrapper">
        <section className="content">
        <div className="row">
        <div className="col-md-12">
        <div className="box box-solid">
          <div className="box-header with-border">
            <i className="fa fa-film" />
            <h3 className="box-title">Travel Details:: {this.state.title}</h3>
          </div>
          <div className="box-body">
          <div className="row">
            <div className="col-md-11">
            <table className="table table-striped" style={{'font-size':'12px'}}>
            <tbody>
                <tr>
                  <td><dt>Travel Title</dt></td>
                  <td>{this.state.title}</td>
                </tr>
                <tr>
                  <td><dt>Description</dt></td>
                  <td>{this.stripHtml(this.state.description)}</td>
                </tr>
                <tr>
                  <td><dt>Trip Type</dt></td>
                  <td>{this.state.trip_type}</td>
                </tr>
                <tr>
                  <td nowrap="nowrap"><dt>Travel Status</dt></td>
                  <td>{(this.state.status==1)?<span class="badge bg-green" title="Active">Active</span>:<span class="badge bg-red" title="InActive">InActive</span>}</td>
                </tr>
              </tbody>
            </table>
            </div>
            </div>
            </div>
           
            <div className="box-header with-border">
             <i className="glyphicon glyphicon-calendar"></i>
                <h3 className="box-title">Itinerary Days List</h3>
                </div>

            <div className="box-body">
            <div className="row">
            <div className="col-md-11">
                <AllItinerariesDaysViewList id={id}/>
            </div>
            </div>
            </div>


            <div className="box-header with-border">
             <i className="glyphicon glyphicon-calendar"></i>
                <h3 className="box-title">Itinerary Days Gallery</h3>
                </div>

            <div className="box-body">
            <div className="row">
            <div className="col-md-11">
                <ItinerariesDayGalleryViewPage id={id}/>
            </div>
            </div>
            </div>

            
            
            <div className="box-header with-border">
                <i className="glyphicon glyphicon-calendar"></i>
                <h3 className="box-title">Travel Experience Addon List</h3>
            </div>
            <div className="box-body">
            <div className="row">
            <div className="col-md-11">
                <ItinerariesAddOnViewPage id={id}/>
            </div>
            </div>
            </div>


            <div className="box-header with-border">
              <i className="glyphicon glyphicon-calendar"></i>
                <h3 className="box-title">Travel Experience Departure Date</h3>
              </div>
             <div className="box-body">
            <div className="row">
            <div className="col-md-11">
                <ItinerariesDepatureTimingViewPage id={id}/>
            </div>
            </div>
            </div>


            <div className="box-header with-border">
              <i className="fa fa-gear"></i>
                <h3 className="box-title">Travel Experience Terms & Conditions</h3>
              </div>
             <div className="box-body">
            <div className="row">
            <div className="col-md-11">
                <ItinerariesTermsViewPage id={id}/>
            </div>
            </div>
            </div>


            <div className="box-header with-border">
              <i className="fa fa-image"></i>
                <h3 className="box-title">All Image List</h3>
              </div>
             <div className="box-body">
            <div className="row">
            <div className="col-md-11">
                <ItinerariesGalleryViewPage id={id}/>
            </div>
            </div>
            </div>

            

            
            


            


            
            </div>
         </div>
        </div>
        </section></div>
            )
            
    };


   
    
}

export default TravelViewPage;