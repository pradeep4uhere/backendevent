/*
 * @PageName    :: EditItinerariesForm.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 18 Oct 2019
 */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Redirect } from 'react-router-dom'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import CKEditor from 'ckeditor4-react';

const urlDayStr    = Constants.ITINERARIES_DAY_URL;
const urlStr = Constants.ITINERARY_DAY_UPDATE_URL;
const token     = localStorage.getItem('token');
class EditItinerariesDayForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all itinerary day details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : '',
            latest_id       : '',
            addon           : '',
            description     : '',
            redirectUrl     : false,
            id              : this.props.id
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.getItinerariesDayDetails =  this.getItinerariesDayDetails.bind(this);
        this.handleChangeDescription= this.handleChangeDescription.bind(this);
        this.handleChange           = this.handleChange.bind(this);
    }
    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var day         = event.target.day.value;
        var details     = this.state.details;
        var	place_name  = this.state.place_name;
        var status      = event.target.status.value;
        var id          = this.state.id;

        //Validation all the fields here
        if(day==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter title of the day', 
                hasTError : 'has-error' });
        }else if(details==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter description of the itinerary day', hasDesError : 'has-error' });
        }else if(place_name==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose addon of the itinerary day', hasDError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the itinerary  day', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(day!='' && place_name!='' && details!=''){
            const formData = {
                event        : {
                    day         : day,
                    place_name  : place_name,
                    details     : details,
                    status      : status,
                    id          : this.state.id,
                    itinerary_id: ''
                },
                token       : token
            }
            axios.post(urlStr, formData)
              .then((response) => {
                  console.log(response);
                if(response.data.data.code==200) {
                  this.setState({
                        message     : response.data.data.message,
                        classstr    : 'alert alert-success',
                        className   : 'success',
                        isMsg       : true,
                        latest_id   : response.data.data.latest_id,
                        redirectUrl : true
                  });
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
                  console.log("Error: ", err);
              })
    
        }


       
    }

    handleChange(e) {
        var strid = e.target.id;
        if(strid=='place_name'){
            this.setState({
                  place_name : e.target.value
                });
        }
        if(strid=='day'){
            this.setState({
                    day : e.target.value
            });
        }
        if(strid=='status'){
            this.setState({
                   status : e.target.value
            });
        }
    }


    renderRedirect = () => {
        if (this.state.redirectUrl) {
          //return <Redirect to={"/viewitinerariedays?"+this.state.itinerary_id} />
        }
      }



    getItinerariesDayDetails(){
        this.setState({
          isOverlay  : true
        });
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            id  : this.props.id
        }
        //alert(formData.event_id);
        axios.post(urlDayStr, formData)
        .then((response) => {
          if(response.data[0].code==200) {
              this.setState({
                  itinerary_day: response.data[0].itinerary_day,
                  day: response.data[0].itinerary_day.day,
                  place_name:response.data[0].itinerary_day.place_name,
                  details:response.data[0].itinerary_day.details,
                  status:response.data[0].itinerary_day.status,
                  itinerary_id:response.data[0].itinerary_day.itinerary_id,
                  itineraryName:response.data[0].itinerary_day.itinerary.title,
                  
                  isOverlay   : false,  
              });
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
        this.getItinerariesDayDetails();
      }


       handleChangeDescription(changeEvent) {
        this.setState({ details: changeEvent.editor.getData() });
       }
      
    render(){
        const { MsgClass }      = this.state;
        const { Msg }           = this.state;
        const { show }          = this.state;
        const { hasTError }     = this.state;
        const { hasDesError }   = this.state;
        const { hasDError }     = this.state;
        const { hasSError }     = this.state;
        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;
        const { redirectUrl }   = this.state;
        console.log(this.state.itinerary_day);
        return(
            <div className="row">
            <div className="col-md-12">
            {this.renderRedirect()}
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Update Itinerary Day:: {this.state.itineraryName}</h3>
                <a href={"/viewitinerariedays?"+this.state.itinerary_id} className="pull-right btn btn-info"><i class="fa fa-arrow-circle-left"></i> View All Days</a>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} enctype="multipart/form-data" id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Place Name</dt>
                        <input type="text" className="form-control" id="place_name" placeholder="Enter place title" value={this.state.place_name} onChange = { this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Day Name</dt>
                        <input type="text" className="form-control" id="day" placeholder="Enter Day title" value={this.state.day} onChange = { this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Place Details</dt>
                        <CKEditor 
                            id="details"  
                            data={this.state.details}  
                            type="classic"
                            onChange={this.handleChangeDescription}
                            
                        />
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
                    <button type="reset" onClick="javascript:history.go(-1)" className="btn btn-danger">Cancel</button>&nbsp;
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

export default EditItinerariesDayForm;
