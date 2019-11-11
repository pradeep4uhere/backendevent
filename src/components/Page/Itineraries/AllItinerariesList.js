/*
 * @PageName    :: LatestUserList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { categoryName } from './_base';
import Datatable from 'react-bs-datatable';

import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Constants  from '../../../config/Constants'
import $ from 'jquery';
import Moment from 'react-moment';  
// import ReactTooltip from 'react-tooltip'
const urlStr    = Constants.ITINERARIES_LIST_URL;
const urlDelStr = Constants.ITINERARY_DELETE_API;
const token     = localStorage.getItem('token');
class AllItinerariesList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventList    : [],
            isMsg       : false,
            className   : '',
            user        : '',
            urlParams   : '',
            show        : false,
            modalIsOpen : false,
            eventDetails : {},
            actiontype  : 'view',
            redirectToReferrer  : false,
            redirectPage        : ''
        }
        this.getEventList       = this.getEventList.bind(this);
        this.handleClick        = this.handleClick.bind(this);
        this.capitalize         = this.capitalize.bind(this);
        this.closeModal         = this.closeModal.bind(this);

        this.stripHtml          = this.stripHtml.bind(this);
        this.handleRouteClick   = this.handleRouteClick.bind(this);
 
    }


    handleRouteClick = (e) => {
        e.preventDefault();
        var idStr = e.target.id;
        var idStrArr = idStr.split('|');
        var id = idStrArr[0];
        var str = idStrArr[1];
        localStorage.setItem('redirectPage','');
        if(str==='details'){
            localStorage.setItem('event_id',id);
            this.setState({redirectPage:'eventdetails'});
            this.setState({redirectToReferrer:true});
        }
        if(str=='gallery'){
            localStorage.setItem('event_id',id);
            this.setState({redirectPage:'eventgallery'});
            this.setState({redirectToReferrer:true});
        }
        if(str=='deleteevent'){
            localStorage.setItem('event_id',id);
            alert(665);
        }
        
        
        
    };


    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            urlParams  : e.target.href
        });
        this.getUserList()
        
    };


    /******Get all the user list here********/   
    getEventList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            urlParams: this.state.urlParams
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.data.code==200) {
                this.setState({
                    eventList    : response.data.data.event.data,
                    event       : response.data.data.event,
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
       this.getEventList();
    }

    capitalize(str) {
        var strVal = '';
        str = str.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
          strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
    }


    //Open Modle box for user Either we can view or edit the user details here
    openModal(e) {
        var strId = e.target.id;
        var array   = strId.split("|");
        var userId  = array[0];
        var type    = array[1];
        this.setState({
              actiontype  : type
        });

        let optionItems = this.state.eventList.map((val,i) =>{
                if(val.id==userId){
                    this.setState({
                        eventDetails: val
                    });        
                }
        });
        this.setState({modalIsOpen: true});
    }
    
    
   
    
    closeModal() {
        this.setState({modalIsOpen: false});
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
        if(response.data.code==200) {
             this.setState({
                message     : response.data.message,
                className   : 'success',
                classstr    : 'alert alert-success',
                isMsg       : true,
            });
            this.getEventList();
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
       const { user }               =  this.state; 
       const { eventDetails }       =  this.state;
       const { actiontype  }        =  this.state;
       const { redirectToReferrer } =  this.state;
       const { redirectPage }       =  this.state;
       const { isMsg }         = this.state;
       const { classstr }      = this.state;
       const { message }       = this.state;
       console.log("eventList++++++++++++++++++++++++",eventList)
       let optionItems = eventList.map((val,i) =>
        <tr>
            <td>{val.id}</td>
            <td>{val.title}</td>
            <td>{this.stripHtml(val.description).substring(0,50)}</td>
            <td>{this.stripHtml(val.addon).substring(0,50)}</td>
            <td>{(val.itinerary_gallery.length>0)?(<span className='badge bg-blue' title="Image Available" >[{val.itinerary_gallery.length}] Image Available</span>):(<span className='badge bg-red' title="Days Images Not Uploaded">No Image Uploaded</span>)}</td>
            <td>{(val.status==1)?(<span className='badge bg-green' title="Active Itinerary" >Active</span>):(<span className='badge bg-red' title="InActive Itinerary">InActive</span>)}</td>
            <td><Moment format="DD-MMM-YYYY">{val.created_at}</Moment></td>
            <td>
                <a title="View Itinerary Detail" href={Constants.APP_FRONT+'destinationexpdetails/'+val.id} target="_blank" ><i className="fa fa-eye"></i></a>&nbsp;&nbsp;
                <a title="View Itinerary Days" href={"viewitinerariedays?"+val.id}><i className="fa fa-map"></i></a>&nbsp;&nbsp;
                <a title="View Itinerary Gallery" href={"itinerariesgallery?"+val.id}><i className="fa fa-image"></i></a>&nbsp;&nbsp;
                <a title="View Itinerary Departure Dates" href={"depaturetiming?"+val.id}><i className="glyphicon glyphicon-calendar"></i></a>&nbsp;&nbsp;
                <a title="Edit Itinerary" href={"edititinerarie?"+val.id}><i className="fa fa-pencil"></i></a>&nbsp;&nbsp; 
                <a title="Delete Itinerary" href="#" onClick={((e) => this.deleteForm(e, val.id))}><i className="fa fa-trash"></i></a></td>
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
                <h3 className="box-title">Latest Itinerary List</h3>
                <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                <table id="example1" class="table table-bordered table-striped" style={{"font-size":"12px"}}>
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Itinerary Name</th>
                        <th>Description</th>
                        <th>AddOn</th>
                        <th>Images</th>
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
export default AllItinerariesList;
