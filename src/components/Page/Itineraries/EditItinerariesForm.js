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
const urlEventStr    = Constants.ITINERARIES_URL;
const urlStr = Constants.ITINERARY_UPDATE_URL;
const token     = localStorage.getItem('token');
class EditItinerariesForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all itinerary details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : '',
            latest_id       : '',
            redirectUrl     : false,
            id              : this.props.id
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.getItinerariesDetails =  this.getItinerariesDetails.bind(this);
    }
    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var title       = event.target.title.value;
        var description = event.target.description.value;
        var addon       = event.target.addon.value;
        var status      = event.target.status.value;
        var id          = this.state.id;

        //Validation all the fields here
        if(title==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter title of the itinerary', 
                hasTError : 'has-error' });
        }else if(description==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter description of the itinerary', hasDesError : 'has-error' });
        }else if(addon==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose addon of the itinerary', hasDError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the itinerary', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(title!='' && description!='' && addon!=''){
            const formData = {
                event        : {
                    title       : title,
                    description : description,
                    addon       : addon,
                    status      : status,
                    id          : this.state.id
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
          return <Redirect to={"/allitineraries"} />
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
              $("#title").val(this.state.event_detail.title);
              $("#description").val(this.state.event_detail.description);
              $("#addon").val(this.state.event_detail.addon);
              $("#status").val(this.state.event_detail.status);
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


        //alert(MsgClass+ show + Msg);
        console.log(this.state);
        return(
            <div className="row">
            <div className="col-md-12">
            {this.renderRedirect()}
            <Message title={MsgClass} Msg={Msg} show={show}/>
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Update Itinerary</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} enctype="multipart/form-data" id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Itinerary Title</dt>
                        <input type="text" className="form-control" id="title" placeholder="Enter event title" />
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Description</dt>
                        <textarea id="description" name="description" rows="10" cols="80"  className="form-control">
                           
                        </textarea>
                    </div>

                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Add On</dt>
                        <textarea id="addon" name="addon" rows="10" cols="80"  className="form-control"></textarea>
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

export default EditItinerariesForm;
