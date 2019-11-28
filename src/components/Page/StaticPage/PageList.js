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
// import ReactTooltip from 'react-tooltip'
const urlStr    = Constants.PAGE_LIST_URL;
const token     = localStorage.getItem('token');
class PageList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list    : [],
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
            console.log(response.data.code);
          if(response.data.code==200) {
                this.setState({
                    list  : response.data.page,
                });
                console.log(response);

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


    
   

    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }


    render(){
       const { list }               =  this.state; 
       const { user }               =  this.state; 
       const { eventDetails }       =  this.state;
       const { actiontype  }        =  this.state;
       const { redirectToReferrer } =  this.state;
       const { redirectPage }       =  this.state;
       let optionItems = list.map((val,i) =>
        <tr>
            <td>{val.id}</td>
            <td>{val.title}</td>
            <td>{this.stripHtml(val.description).substring(0,10)}</td>
            <td>{(this.stripHtml(val.description)).substring(0,100)}</td>
            <td>{(val.status==1)?(<span className='label label-success'>Active</span>):(<span className='label label-danger'>In Active</span>)}</td>
            <td>
                <a href={"/editpage?"+val.id} title="Edit Page"><i className="fa fa-pencil"></i></a>&nbsp;&nbsp; 
            </td>
        </tr>
        );
        if (redirectToReferrer === true) {
            return <Redirect to={"/"+redirectPage}/>;
        }
        return(
            <div className="row">
              <div className="col-md-12">
                <div className="box box-info">
                <div className="box-header with-border">
                <h3 className="box-title">All Page List</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                <table id="example11" class="table table-bordered table-striped" style={{"font-size":"12px"}}>
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Page Name</th>
                        <th>slug</th>
                        <th>Description</th>
                        <th>Status</th>
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
export default PageList;
