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
//const urlStr1    = Constants.EVENT_LIST_URL;
const urlStr    = Constants.THEATRE_LIST_URL;
const token     = localStorage.getItem('token');
class AllTheatreList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            theatreList : [],
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
        this.handleRouteClick   =   this.handleRouteClick.bind(this);
 
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
       console.log("theatreList==============="+this.state.theatreList);

       let optionItems = theatreList.map((val,i) =>
        <tr>
            <td>{val.id}</td>
            <td>{val.theater_name}</td>
            <td>{val.address}</td>
            <td>{val.company_name}</td>
            <td>{val.contact_number}</td>
            <td>{val.email_address}</td>
            <td>{(val.status==1)?(<span className='label label-success'>Active</span>):(<span className='label label-danger'>In Active</span>)}</td>
            <td><Moment format="DD-MMM-YYYY">{val.created_at}</Moment></td>
            <td>
                <a href="#" onClick={this.openModal} id={val.id+'|view'} title="View Theatre"><i className="fa fa-eye"></i></a>&nbsp;&nbsp; 
                <a href={"edittheatre?"+val.id} title="Edit Theatre"><i className="fa fa-pencil"></i></a>&nbsp;&nbsp;
                <a href={"addseat?"+val.id+'|1'} title="Add Seats"><i className="fa fa-wheelchair"></i></a>&nbsp;&nbsp;
                <a href="#" title="Edit Delete"><i className="fa fa-trash-o"></i></a></td>
        </tr>
        );
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
                <table id="example1" class="table table-bordered table-striped" style={{"font-size":"12px"}}>
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
export default AllTheatreList;
