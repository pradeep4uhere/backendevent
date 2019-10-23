/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
const urlStr        = Constants.SEATING_TYPE_GET;
const urlStrUpdate  = Constants.SEATING_TYPE_UPDATE;

const token     = localStorage.getItem('token');
class SittingEditForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all seating details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : '',
            id              : this.props.id,
            sittingList     : {}
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.getSittingList = this.getSittingList.bind(this);
        this.handleChange   = this.handleChange.bind(this);
    }
    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var title       = event.target.title.value;
        var status      = event.target.status.value;
        var id          = this.props.id;

        //Validation all the fields here
        if(title==''){
            this.setState({isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter title seating type', hasTError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the event', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(title!=''){
            const formData = {
                title       : title,
                status      : status,
                token       : token,
                id          : id
            }
            axios.post(urlStrUpdate, formData)
              .then((response) => {
                if(response.data.code==200) {
                  this.setState({
                        message     : response.data.message,
                        classstr    : 'alert alert-success',
                        className   : 'success',
                        isMsg       : true,
                  });
                  $('#title').val('');
                  $('#status').val('');
                }
                else
                {
                    this.setState({ 
                        message:response.data.data.message,
                        className   : 'error',
                        classstr    : 'alert alert-danger',
                        isMsg       : true,
                    });
                  
                }
              })
              .catch((err) => {
                  this.setState({message:err});
                  this.setState({className:'error'});
                  this.setState({classstr: 'alert alert-danger'});
              })
    
        }


       
    }


    handleChange(e) {
        var strid = e.target.id;
        if(strid=='title'){
            this.setState({
                sittingList : {
                    title : e.target.value
                    }
                });
        }
      
        if(strid=='status'){
            this.setState({
                sittingList : {
                    status : e.target.value
                }
            });
        }
    }


    /******Get all the user list here********/   
    getSittingList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            id       : this.props.id
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.code==200) {
              console.log(response.data.sitting);
                this.setState({
                    sittingList    : response.data.sitting,
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
       
       this.getSittingList();
    }

    render(){
        const { sittingList }   = this.state;
        const { MsgClass }      = this.state;
        const { Msg }           = this.state;
        const { show }          = this.state;
        const { hasTError }     = this.state;
        const { hasSError }     = this.state;
        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;
        $('#status').val(this.state.sittingList.status);
        
        return(
            <div className="row">
            <div className="col-md-12">
            <Message title={MsgClass} Msg={Msg} show={show}/>
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Update Sitting Type</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Seating Type Name</dt>
                        <input onChange = { this.handleChange.bind(this)} type="text" className="form-control" id="title" placeholder="Enter seating title" value={this.state.sittingList.sitting_type_name} />
                    </div>
                    <div className={"form-group"+" "+hasSError}>
                    <dt htmlFor="inputEmail3">Status</dt>
                            <select className="form-control" id="status" onChange = { this.handleChange.bind(this)}>
                                <option value="1">Active</option>
                                <option value="0">In Active</option>
                            </select>
                     </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                    <button type="reset" className="btn btn-danger">Cancel</button>&nbsp;
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </div>
      );
    };
}

export default SittingEditForm;
