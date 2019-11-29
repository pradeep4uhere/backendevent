/*
 * @PageName    :: AddItinerariesDayForm.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 30 Oct 2019
 */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Redirect } from 'react-router-dom'
import Constants  from '../../../config/Constants'
import CKEditor from 'ckeditor4-react';
const urlEventStr   = Constants.ITINERARIES_URL;
const urlStr        = Constants.ITINERARIES_ADD_DAYS_URL;
const token         = localStorage.getItem('token');

class AddItinerariesDayForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all Travel Experience details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : '',
            latest_id       : '',
            redirectUrl     : false,
            description     : '',
            id              : this.props.id
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.getItinerariesDetails =  this.getItinerariesDetails.bind(this);
        this.handleChangeDescription= this.handleChangeDescription.bind(this);
    }

    handleChangeDescription(changeEvent) {
        this.setState({ description: changeEvent.editor.getData() });
       }

    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var day             = event.target.title.value;
        var place_name      = event.target.place.value;
        var details         = this.state.description;
        var itinerary_id    = this.state.id;
        var status          = event.target.status.value;

        //Validation all the fields here
        if(place_name==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter place of the itinerary', hasDesError : 'has-error' });
        }else if(day==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter day of the travel experience', 
                hasTError : 'has-error' });
        }else if(details==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose place details of the itinerary', hasDError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the itinerary', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(day!='' && details!='' && place_name!=''){
            const formData = {
                event        : {
                    day         : day,
                    place_name  : place_name,
                    details     : details,
                    itinerary_id: itinerary_id,
                    status      : status
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

    renderRedirect = () => {
        if (this.state.redirectUrl) {
          return <Redirect to={"/viewitinerariedays?"+this.state.id} />
        }
      }



    getItinerariesDetails(){
        this.setState({
          isOverlay  : true
        });
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            event_id  : this.props.id
        }
        //alert(formData.event_id);
        axios.post(urlEventStr, formData)
        .then((response) => {
          if(response.data[0].code==200) {
              this.setState({
                  event_detail: response.data[0].data,
                  isOverlay  : false,  
              });
              console.log(this.state.event_detail);
              $("#titleName").html(this.state.event_detail.title);
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
        this.getItinerariesDetails();
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
        // let  itineraryName      =  this.state.event_detail.title; 

        //alert(MsgClass+ show + Msg);
        console.log(this.state);
        return(
            <div className="row">
            <div className="col-md-12">
            {this.renderRedirect()}
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Add Day into Travel Experience:: <span id="titleName"></span></h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Place Name</dt>
                        <input type="text" className="form-control" id="place" placeholder="Enter place name" /> 
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Day Name</dt>
                        <input type="text" className="form-control" id="title" placeholder="Enter event title" />
                        
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Place Details</dt>
                        <CKEditor 
                            id="description"  
                            data={this.state.description}  
                            type="classic"
                            onChange={this.handleChangeDescription}
                            
                        />
                    </div>

                    <div className={"form-group"+" "+hasSError}>
                    <dt htmlFor="inputEmail3">Status</dt>
                            <select className="form-control" id="status">
                                <option value="1">Active</option>
                                <option value="0">In Active</option>
                            </select>
                     </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                    <button type="submit" className="btn btn-default">Cancel</button>&nbsp;
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

export default AddItinerariesDayForm;
