/*
 * @PageName    :: LatestUserList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Constants  from '../../../config/Constants'
import $ from 'jquery';
import Moment from 'react-moment';  
// import ReactTooltip from 'react-tooltip'
const urlStr    = Constants.ITINERARIES_DAYS_LIST_URL;
const urlDelStr = Constants.ITINERARY_DAY_DELETE_API;

const token     = localStorage.getItem('token');
class AllItinerariesDaysList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventList           : [],
            isMsg               : false,
            className           : '',
            user                : '',
            urlParams           : '',
            show                : false,
            modalIsOpen         : false,
            eventDetails        : {},
            actiontype          : 'view',
            redirectToReferrer  : false,
            redirectPage        : '',
            id                  : this.props.id,
            titleName           : ''

        }
        this.getItinerariesDaysList = this.getItinerariesDaysList.bind(this);
        this.handleClick            = this.handleClick.bind(this);
        this.capitalize             = this.capitalize.bind(this);
        this.stripHtml              = this.stripHtml.bind(this);
 
    }


    handleClick = (e) => 
    {
        e.preventDefault()
        this.setState({
            urlParams  : e.target.href,
        });
        this.getUserList()
        
    };


    /******Get all the user list here********/   
    getItinerariesDaysList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            urlParams: this.state.urlParams,
            event_id : this.state.id
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.data.code==200) {
                this.setState({
                    eventList    : response.data.data.event.data,
                    event        : response.data.data.event,
                    titleName    : response.data.data.event.data[0].itinerary.title
                });
                $('#ipl-progress-indicator').hide();
                


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
       this.getItinerariesDaysList();
    }

    capitalize(str) {
        var strVal = '';
        str = str.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
          strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
    }


    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }

    /*
     * Remove Image form Event
     */    
    deleteForm(e,id) {
        const formData={id : id,token:token,}
        axios.post(urlDelStr, formData)
        .then((response) => {
        if(response.data[0].code===200) {
             this.setState({
                message     : response.data[0].message,
                className   : 'success',
                classstr    : 'alert alert-success',
                isMsg       : true,
            });
            this.getItinerariesDaysList();
        }else{
            this.setState({ 
                message:response.data.message,
                className   : 'error',
                classstr    : 'alert alert-danger',
                isMsg       : true,
            });
        }}).catch((err) => {
            console.log("Error: ", err);
        })
    }


    render(){
       const { eventList }          =  this.state; 
       const { redirectToReferrer } =  this.state;
       const { redirectPage }       =  this.state;
       const { isMsg }              =  this.state;
       const { classstr }           =  this.state;
       const { message }            =  this.state;
       const { titleName }          =  this.state;
       const { id }                 =  this.state;
       console.log("eventList============",eventList);
       let optionItems = eventList.map((val,i) =>
        <tr>
            <td>{val.id}</td>
            <td>{val.itinerary.title}</td>
            <td>{this.stripHtml(val.day).substring(0,100)}</td>
            <td>{this.stripHtml(val.place_name).substring(0,100)}</td>
            <td>{this.stripHtml(val.details).substring(0,100)}</td>
            <td>{(val.status==1)?(<span className='badge bg-green' title="Active Itinerary" >Active</span>):(<span className='badge bg-red' title="InActive Itinerary">InActive</span>)}</td>
            <td><Moment format="DD-MMM-YYYY">{val.created_at}</Moment></td>
            <td>
                <a title="View Itinerary Day Gallery" href={"itinerariesgallery?"+val.id}><i className="fa fa-image"></i></a>&nbsp;&nbsp;
                <a title="Edit Itinerary Day" href={"edititinerarie?"+val.id}><i className="fa fa-pencil"></i></a>&nbsp;&nbsp; 
                <a title="Delete Itinerary Day" href="#" onClick={((e) => this.deleteForm(e, val.id))}><i className="fa fa-trash"></i></a></td>
        </tr>
        );
        if (redirectToReferrer === true) {
            return <Redirect to={"/"+redirectPage}/>;
        }
        return(
            <div className="row">
              <div className="col-md-12">
                {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}    
                <div className="box box-info">
                <div className="box-header with-border">
                <h3 className="box-title">{titleName} Itinerary Days List</h3>
                <div className="box-tools pull-right">
                <a href={'/additineraryday?'+id} className="btn btn-box-tool"><i className="fa fa-plus" />&nbsp;Add New Itinerary Day</a>
                </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                <table id="example11" class="table table-bordered table-striped" style={{"font-size":"12px"}}>
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Itinerary Name</th>
                        <th>Day</th>
                        <th>Place Name</th>
                        <th>Details</th>
                        <th>Status</th>
                        <th>Created On</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {optionItems}
                    </tbody>
                </table>
                </div>
                {/* /.table-responsive */}
                </div>
               
                </div>
                </div>
                </div>
      );
    };
}
export default AllItinerariesDaysList;
