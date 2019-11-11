/*
 * @PageName    :: AllLatestDestinationList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All Latest Destination
 * @Created Date:: 16 Sept 2019
 */
import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import $ from 'jquery';
// import ReactTooltip from 'react-tooltip'
const urlStr    = Constants.DESTINATION_ALL_URL;
const urlDeleteStr  = Constants.DESTINATION_DELETE_URL;
const token     = localStorage.getItem('token');
class AllLatestDestinationList extends React.Component{
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
    
        this.openModal          = this.openModal.bind(this);
        this.afterOpenModal     = this.afterOpenModal.bind(this);
        this.closeModal         = this.closeModal.bind(this);

        this.stripHtml          = this.stripHtml.bind(this);
        this.handleRouteClick   = this.handleRouteClick.bind(this);
        this.deletedestination  = this.deletedestination.bind(this);
 
    }

    deletedestination = (e) =>{
        var idStr = e;
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            id       : idStr
        }
        axios.post(urlDeleteStr, formData)
        .then((response) => {
          if(response.data.code==200) {
                console.log(response.data);
                this.setState({
                    message     : response.data.message,
                    classstr    : 'alert alert-success',
                    className   : 'success',
                    isMsg       : true,
                });
                this.getEventList();
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
    };


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
        if(str=='destinationgallery'){
            localStorage.setItem('event_id',id);
            this.setState({redirectPage:'eventgallery'});
            this.setState({redirectToReferrer:true});
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
          
          if(response.data.code==200) {
              console.log(response.data);
                this.setState({
                    eventList    : response.data.data,
                    event       : response.data.data,
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

       let optionItems = eventList.map((val,i) =>
        <tr>
            <td><a href="#">{val.id}</a></td>
            <td><a href="#" title="Click to Add Details" onClick={this.handleRouteClick} id={val.id+'|details'}>{val.title}</a></td>
            <td><a data-tip={this.stripHtml(val.descriptions)}>{this.stripHtml(val.descriptions).substring(0,50)}</a>
                {/* <ReactTooltip className='extraClass'  delayHide={500} type="success" effect="solid"/> */}
            </td>
            <td>{val.altitude}</td>
            <td>{val.climate}</td>
            <td>{val.population}</td>
            <td>{this.stripHtml(val.shopping).substring(0,50)}</td>
            <td>{this.stripHtml(val.cuisine).substring(0,50)}</td>
            <td>{(val.status==1)?(<span className='label label-success'>Active</span>):(<span className='label label-danger'>In Active</span>)}</td>
            
            <td>
                <a title="View Destination Page" href={Constants.APP_FRONT+"destinationdetails/"+val.id} target="_blank"><i className="fa fa-eye"></i></a>&nbsp;&nbsp;
                <a title="Destination Gallery" href={"destinationgallery?"+val.id}><i className="fa fa-image"></i></a>&nbsp;&nbsp;
                <a title="Edit Destination Page" href={"editdestination?"+val.id}><i className="fa fa-pencil"></i></a>&nbsp;&nbsp; 
                <a title="Delete Destination Page" href="#" onClick={(e) => this.deletedestination(val.id)} id={val.id}><i className="fa fa-trash"></i></a></td>
        </tr>
        );
        if (redirectToReferrer === true) {
            return <Redirect to={"/"+redirectPage}/>;
        }
        return(
            <div className="row">
              <div className="col-md-12">
                <Message title={this.state.className}    Msg='Your message goes here' show={this.isMsg}/>
                {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
                <div className="box box-info">
                <div className="box-header with-border">
                <h3 className="box-title">Latest Destination List</h3>
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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Altitude</th>
                        <th>Climate</th>
                        <th>Population</th>
                        <th>Shopping</th>
                        <th>Cuisine</th>
                        <th>Status</th>
                        
                        <th nowrap="nowrap" style={{"width":"95px"}}>Action</th>
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
export default AllLatestDestinationList;
