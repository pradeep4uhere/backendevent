/*
 * @PageName    :: LatestUserList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../config/Constants'
import Message from '../../components/Message';
import $ from 'jquery';
import Modal from 'react-modal';
import UserViewPage from '../Page/User/UserViewPage';
import UserEditPage from '../Page/User/UserEditPage';
import Moment from 'react-moment';  
import { MDBDataTable } from 'mdbreact';

const dateToFormat = '1976-04-19T12:59-0500';

const urlStr    = Constants.USER_LIST_URL;
const token     = localStorage.getItem('token');
class LatestMemberList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userList    : [],
            isMsg       : false,
            className   : '',
            user        : '',
            urlParams   : '',
            show        : false,
            modalIsOpen : false,
            userDetails : {},
            actiontype  : 'view',
        }
        this.getUserList    = this.getUserList.bind(this);
        this.handleClick    = this.handleClick.bind(this);
        this.capitalize     = this.capitalize.bind(this);
    
        this.openModal      = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal     = this.closeModal.bind(this);
        
 
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            urlParams  : e.target.href
        });
        this.getUserList()
        
    };


    /******Get all the user list here********/   
    getUserList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            urlParams: this.state.urlParams
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.data.code==200) {
                this.setState({
                    userList    : response.data.data.user.data,
                    user        : response.data.data.user,
                    dataTable   : response.data.data.dataTable,  
                });
                this.state.dataTable.rows.map((val,i) =>{
                    
                    var dataStr = <div><a href={"/userorder?"+val.id} title="View User Booking"><i className="fa fa-shopping-cart"></i></a> &nbsp; 
                    <a href="#" onClick={this.openModal} id={val.id+'|view'} title="View User Detail"><i className="fa fa-eye"></i></a> &nbsp; 
                    <a title="Edit User" href={"/useredit?"+val.id} id={val.id+'|'+'edit'}><i className="fa fa-pencil"></i></a>&nbsp;
                    <a href="#" title="Delete User"><i className="fa fa-trash"></i></a></div>;
                    this.state.dataTable.rows[i].action = dataStr;
                    var statusStr = (val.status==1)?(<span className='badge bg-green' title="Active Itinerary" >Active</span>):(<span className='badge bg-red' title="InActive Itinerary">InActive</span>)
                    this.state.dataTable.rows[i].status = statusStr;
                    this.setState({dataTable:this.state.dataTable});
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
       this.getUserList();
    }

    capitalize(str) {
        return str;
    }


    //Open Modle box for user Either we can view or edit the user details here
    openModal(e) {
        e.preventDefault();
        var strId = e.target.id;
        var array   = strId.split("|");
        var userId  = array[0];
        var type    = array[1];
        this.setState({
              actiontype  : type
        });
        let optionItems = this.state.userList.map((val,i) =>{
                if(val.id==userId){
                    this.setState({
                        userDetails: val
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


    render(){
       const { userList }       =  this.state; 
       const { user }           =  this.state; 
       const { userDetails }    =  this.state;
       const { actiontype  }    =  this.state;
       const { dataTable }     = this.state;
        return(
            <div className="row">
              <div className="col-md-12">
                {/*Model Box Start For View User Details*/}
                <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="User Details">
                
                {/*Load UserViewPage Component for Display the details of User, params user Object*/}
                {(actiontype=='edit')?(
                    <UserEditPage user={userDetails}/>
                ):(<div>
                    <UserViewPage user={userDetails}/>
                    <button type="button" class="btn btn-primary pull-right" onClick={this.closeModal}>Close</button>
                    </div>
                )}
                </Modal>
                {/*Model Box Start For View User Edit*/}    

                <Message title={this.state.className}    Msg='Your message goes here' show={this.isMsg}/>
                <div className="box box-info">
                <div className="box-header with-border">
                <h3 className="box-title">Latest User List</h3>
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
                </div>
                </div>
               
                </div>
                </div>
                </div>
      );
    };
}
export default LatestMemberList;
