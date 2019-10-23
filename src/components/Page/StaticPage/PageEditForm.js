/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import { platform } from 'os';
import { useDropzone } from 'react-dropzone';
const urlStr = Constants.PAGE_UPDATE_URL;
const urlEventStr    = Constants.PAGE_DETAIL_URL;
const token     = localStorage.getItem('token');
class PageEditForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventId         : this.props.id,
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all page details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasSlugError       : '',
            hasSError       : '',
            isOverlay       : true,
            event           : {},
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.getEventDetails= this.getEventDetails.bind(this);
    }



    handleChange(e) {
        var strid = e.target.id;
        if(strid=='title'){
            this.setState({
                event : {
                    page_name : e.target.value
                    }
                });
        }
        if(strid=='description'){
            this.setState({
                event : {
                    description : e.target.value
                }
            });
        }
        if(strid=='slug'){
            this.setState({
                event : {
                    slug : e.target.value
                }
            });
        }
        if(strid=='status'){
            this.setState({
                event : {
                    status : e.target.value
                }
            });
        }
    }


    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var id          = this.props.id;
        var title       = event.target.title.value;
        var description = event.target.description.value;
        var slug   = event.target.slug.value;
        var status      = event.target.status.value;

        //Validation all the fields here
        if(title==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter title of the page', 
                hasTError : 'has-error' });
        }else if(description==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter description of the page', hasDesError : 'has-error' });
        }else if(slug==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please slug of the page', hasDError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the page', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(title!='' && description!='' && slug!=''){
            const formData = {
                id          : id,
                title       : title,
                description : description,
                slug        : slug,
                status      : status,
                token       : token
            }
            axios.post(urlStr, formData)
              .then((response) => {
                  console.log(response);
                if(response.data.code==200) {
                  this.setState({
                        message     : response.data.message,
                        classstr    : 'alert alert-success',
                        className   : 'success',
                        isMsg       : true,
                  });
                }
                else
                {
                    this.setState({ 
                        message:response.data.message,
                        className   : 'error',
                        classstr    : 'alert alert-danger',
                        isMsg       : true,
                    });
                  
                }
              })
              .catch((err) => {
                  console.log("Error: ", err);
                  this.setState({message:err});
                  this.setState({className:'error'});
                  this.setState({classstr: 'alert alert-danger'});
              })
    
        }
        
       
    }


    getEventDetails(){
        this.setState({
          isOverlay  : true
        });
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            id        : this.props.id
        }
        axios.post(urlEventStr, formData)
        .then((response) => {
            console.log(response);
          if(response.data.code==200) {
              this.setState({
                  event       : response.data.page,
                  isOverlay  : false
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
            this.setState({isMsg:true});
            this.setState({className:'error'});
        })
    }

    componentDidMount(){
        this.getEventDetails();
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
        const { isOverlay }     = this.state;
        const { event }         = this.state;

        console.log("this.event========");
        console.log(this.state.event);
        $('#status').val(this.state.event.status);
        return(
            <div className="row">
            <div className="col-md-12">
            <div className="overlay" show={isOverlay}><i className="fa fa-refresh fa-spin"></i></div>
            <Message title={MsgClass} Msg={Msg} show={show}/>
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Edit Page</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} enctype="multipart/form-data" id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Page Title</dt>
                        <input type="text" className="form-control" id="title" placeholder="Enter event title" value={this.state.event.page_name} onChange = { this.handleChange.bind(this)}/>
                    </div>
                    <div className={"   form-group"+" "+hasTError}>
                        <dt>Page Slug</dt>
                        <input type="text" className="form-control" id="slug" placeholder="Enter event slug" value={this.state.event.slug} onChange = { this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Description</dt>
                        <textarea id="description" name="description" rows="10" cols="80"  className="form-control" value= {this.state.event.description}>
                        </textarea>
                    </div>

                  
                      
                    {/* <div className="form-group">
                        <dt htmlFor="exampleInputFile">Page Banner</dt>
                        <input type="file" id="event_banner" name="event_banner" />
                        <p className="help-block">(only jpeg, jpg, png, gif file extenstion allowd).</p>
                    </div> */}
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

export default PageEditForm;
