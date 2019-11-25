/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Constants  from '../../../config/Constants'
import CKEditor from 'ckeditor4-react';
import Message from '../../../components/Message';
const urlStr = Constants.ITINERARIES_ADD_URL;
const token     = localStorage.getItem('token');
class ItinerariesForm extends React.Component{
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
            description     : '',
            redirectUrl     : false
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleChangeAddOn  = this.handleChangeAddOn.bind(this);
    }
    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var title       = event.target.title.value;
        var description = this.state.description;
        var trip_type       = event.target.trip_type.value;
        var status      = event.target.status.value;

        //Validation all the fields here
        if(title==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter title of the itinerary', 
                hasTError : 'has-error' });
        }else if(description==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter description of the itinerary', hasDesError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the itinerary', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(title!='' && description!=''){
            const formData = {
                event        : {
                    title       : title,
                    description : this.state.description,
                    addon       : trip_type,
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
          return <Redirect to={"/allitineraries"} />
        }
      }
    

    handleChangeAddOn(changeEvent) {
    this.setState({ description: changeEvent.editor.getData() });
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
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Add New Travel Experience</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} enctype="multipart/form-data" id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Title</dt>
                        <input type="text" className="form-control" id="title" placeholder="Enter event title" />
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Description</dt>
                        <CKEditor 
                            id="description"  
                            data={this.state.description}  
                            type="classic"
                            onChange={this.handleChangeAddOn}
                            
                        />
                    </div>

                    <div className={"form-group"+" "+hasSError}>
                    <dt htmlFor="inputEmail3">Trip Type</dt>
                            <select className="form-control" id="trip_type">
                                <option value="Short Trip">Short Trip</option>
                                <option value="Long Trip">Long Trip</option>
                            </select>
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

export default ItinerariesForm;
