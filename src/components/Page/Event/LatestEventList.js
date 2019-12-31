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
import Message from '../../../components/Message';
import $ from 'jquery';
import Modal from 'react-modal';
import EventViewPage from '../../Page/Event/EventViewPage';
import UserEditPage from '../../Page/User/UserEditPage';
import Moment from 'react-moment';  
import { MDBTable, MDBTableBody, MDBTableHead, MDBDataTable  } from 'mdbreact';

// import ReactTooltip from 'react-tooltip'
const urlStr    = Constants.EVENT_LIST_URL;
const urlDelStr = Constants.EVENT_DELETE_API;
const token     = localStorage.getItem('token');
class LatestEventList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventList    : [],
            dataTable   : [],
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
    
        this.openModal          = this.openModal.bind(this);
        this.afterOpenModal     = this.afterOpenModal.bind(this);
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
        if(str=='details'){
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
                    event        : response.data.data.event,
                    dataTable    : response.data.data.dataTable,
                });
                 /************datatable Strat*************/
                 this.state.dataTable.rows.map((val,i) =>{
                    
                    var dataStr = <div>
                    <a title="View Event Detail" href={"eventview?"+val.id}><i className="fa fa-eye"></i></a>&nbsp;&nbsp;
                    <a title="View Event Language/Location" href={"eventlocation?"+val.id}><i className="fa fa-map"></i></a>&nbsp;&nbsp;
                    <a title="View Event Gallery" href={"eventgallery?"+val.id}><i className="fa fa-image"></i></a>&nbsp;&nbsp;
                    <a title="View Event Timing" href={"eventtiming?"+val.id}><i className="fa fa-clock-o"></i></a>&nbsp;&nbsp;
                    <a title="Edit Event" href={"editevent?"+val.id}><i className="fa fa-pencil"></i></a>&nbsp;&nbsp; 
                    <a title="Delete Event" href="#" onClick={((e) => this.deleteForm(e, val.id))}><i className="fa fa-trash"></i></a></div>;
                    this.state.dataTable.rows[i].action = dataStr;

                    var statusStr = (val.status==1)?(<span className='badge bg-green' title="Active Itinerary" >Active</span>):(<span className='badge bg-red' title="InActive Itinerary">InActive</span>)
                    this.state.dataTable.rows[i].status = statusStr;


                    var featureStr = (val.is_feature==1)?(<span className='label label-success' title="Feature Event"><i className="fa fa-star" ></i></span>):(<span className='label label-default' title="Not Feature Event" ><i className="fa fa-star" ></i></span>)
                    this.state.dataTable.rows[i].is_feature = featureStr;

                    this.setState({dataTable:this.state.dataTable});
                });
                /************datatable Ends*************/
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
    
    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
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
        if(response.data.data.code==200) {
            this.setState({
                message     : response.data.data.message,
                className   : 'success',
                classstr    : 'alert alert-success',
                isMsg       : true,
            });
            this.getGalleryList();
        }else{
            this.setState({ 
                message:response.data.data.message,
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
       const { dataTable }     = this.state;
       let optionItems = eventList.map((val,i) =>
        <tr>
            <td><a href="#">{val.id}</a></td>
            <td><a href="#" title="Click to Add Details" onClick={this.handleRouteClick} id={val.id+'|details'}>{val.title}</a></td>
            <td>{val.durration} Min</td>
            <td><a data-tip={this.stripHtml(val.description)}>{this.stripHtml(val.description).substring(0,100)}</a>
                {/* <ReactTooltip className='extraClass'  delayHide={500} type="success" effect="solid"/> */}
            </td>
            <td>{(val.status==1)?(<span className='badge bg-green' title="Active Event" >Active</span>):(<span className='badge bg-red' title="InActive Event">InActive</span>)}</td>
            <td>{(val.is_feature==1)?(<span className='label label-success' title="Feature Event"><i className="fa fa-star" ></i></span>):(<span className='label label-default' title="Not Feature Event" ><i className="fa fa-star" ></i></span>)}</td>
            <td><Moment format="DD-MMM-YYYY">{val.created_at}</Moment></td>
            <td>
                <a title="View Event Detail" href={Constants.APP_FRONT+'day-exp-detail/31-156'} target="_blank"><i className="fa fa-eye"></i></a>&nbsp;&nbsp;
                <a title="View Event Location" href={"eventlocation?"+val.id}><i className="fa fa-map"></i></a>&nbsp;&nbsp;
                <a title="View Event Gallery" href={"eventgallery?"+val.id}><i className="fa fa-image"></i></a>&nbsp;&nbsp;
                <a title="View Event Timing" href={"eventtiming?"+val.id}><i className="fa fa-clock-o"></i></a>&nbsp;&nbsp;
                <a title="Edit Event" href={"editevent?"+val.id}><i className="fa fa-pencil"></i></a>&nbsp;&nbsp; 
                <a title="Delete Event" href="#" onClick={((e) => this.deleteForm(e, val.id))}><i className="fa fa-trash"></i></a></td>
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
                <h3 className="box-title">Latest Event List</h3>
                <div className="box-tools pull-right">
                <a href="/addevent" className="btn btn-sm btn-danger"><i className="fa fa-plus" />&nbsp;Add New Event</a>
                </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                {/* <MDBTable 
                    responsive  
                    striped
                    small
                >
                    <MDBTableHead columns={dataTable.columns}/>
                    <MDBTableBody rows={dataTable.rows} />
                </MDBTable> */}
                <MDBDataTable
                striped
                bordered
                hover
                data={dataTable}
                exportToCSV={true}
                />
               
                </div>
                {/* /.table-responsive */}
                </div>
               
                </div>
                </div>
                </div>
      );
    };
}
export default LatestEventList;
