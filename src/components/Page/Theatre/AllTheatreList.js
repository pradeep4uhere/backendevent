/*
 * @PageName    :: allTheatreList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the theatre
 * @Created Date:: 15 May 2019
 */
import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import Moment from 'react-moment';  
import $ from 'jquery';
import { MDBDataTable } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//const urlStr1    = Constants.EVENT_LIST_URL;
const urlStr    = Constants.THEATRE_LIST_URL;
const urlDeleteStr = Constants.THEATRE_DELETE_LIST_URL;
const token     = localStorage.getItem('token');
class AllTheatreList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            theatreList : [],
            dataTable   : [],
            isMsg       : false,
            className   : '',
            user        : '',
            urlParams   : '',
            show        : false,
            modalIsOpen : false,
            actiontype  : 'view',
            redirectToReferrer  : false,
            redirectPage        : ''
        }
        this.getTheatreList       = this.getTheatreList.bind(this);
        this.capitalize         = this.capitalize.bind(this);

        this.stripHtml          = this.stripHtml.bind(this);
        this.handleRouteClick   = this.handleRouteClick.bind(this);
        this.remove             = this.remove.bind(this);
 
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
        
        
    };

    submit = (e,val) => {
        console.log(val);
        confirmAlert({
          title: 'You want to delete theater "'+ val.theater_name+'" ?',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.remove(val.id) 
              
            },
            {
              label: 'No',
              onClick: () =>  false
            }
          ]
        });
      };

    remove(id){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            id       : id
        }
        axios.post(urlDeleteStr, formData)
        .then((response) => {
          if(response.data.code==200) {
                this.getTheatreList();
                this.setState({
                });
            }else{
                this.setState({isMsg:true});
                this.setState({className:'error'});
            }
        })
        .catch((err) => {
            this.setState({isMsg:true});
            this.setState({className:'error'});
        })
    }
   
    /******Get all the user list here********/   
    getTheatreList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            urlParams: this.state.urlParams
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.code==200) {
                this.setState({
                    theatreList : response.data.theatre.data,
                    theatre     : response.data.theatre,
                    dataTable   : response.data.dataTable,
                });
                 /************datatable Strat*************/
                 this.state.dataTable.rows.map((val,i) =>{
                    
                    var dataStr = <div><a href={"edittheatre?"+val.id} title="Edit Theatre"><i className="fa fa-pencil"></i></a>&nbsp;&nbsp;
                                 <a href={"addseat?"+val.id+'|1'} title="Add Seats"><i className="fa fa-wheelchair"></i></a>&nbsp;&nbsp;
                                 <a href="#" onClick={((e) => this.submit(e,val))} title="Edit Delete"><i className="fa fa-trash-o"></i></a>
                                 </div>;
                    this.state.dataTable.rows[i].action = dataStr;

                    var statusStr = (val.status==1)?(<span className='badge bg-green' title="Active Itinerary" >Active</span>):(<span className='badge bg-red' title="InActive Itinerary">InActive</span>)
                    this.state.dataTable.rows[i].status = statusStr;

                    var imageStr = (val.itinerary_gallery>0)?(<span className='badge bg-blue' title="Image Available" >[{val.itinerary_gallery}] Image Available</span>):(<span className='badge bg-red' title="Days Images Not Uploaded">No Image Uploaded</span>)
                    this.state.dataTable.rows[i].itinerary_gallery = imageStr;

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
       this.getTheatreList();
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


    render(){
       const { theatreList }        =  this.state; 
       const { user }               =  this.state; 
       const { actiontype  }        =  this.state;
       const { redirectToReferrer } =  this.state;
       const { redirectPage }       =  this.state;
       const { dataTable }          =  this.state;
       console.log("theatreList==============="+this.state.theatreList);
        if (redirectToReferrer === true) {
            return <Redirect to={"/"+redirectPage}/>;
        }
        return(
            <div className="row">
              <div className="col-md-12">
                <Message title={this.state.className}    Msg='Your message goes here' show={this.isMsg}/>
                <div className="box box-info">
                <div className="box-header with-border">
                <h3 className="box-title">Latest Theatre List</h3>
                <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                <MDBDataTable
                striped
                bordered
                hover
                data={dataTable}
                exportToCSV={true}
                />
                {/* <table id="example1" class="table table-bordered table-striped" style={{"font-size":"12px"}}>
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Theatre Name</th>
                        <th>Address</th>
                        <th>Company Name</th>
                        <th>Phone</th>
                        <th>Email Address</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th nowrap="nowrap" style={{"width":"150"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody style={{"font-size":"12px"}}>
                    {optionItems}
                    </tbody>
                </table> */}
                </div>
                {/* /.table-responsive */}
                </div>
                
                </div>
                </div>
                </div>
      );
    };
}
export default AllTheatreList;
