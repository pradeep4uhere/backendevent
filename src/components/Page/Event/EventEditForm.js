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
import CKEditor from 'ckeditor4-react';
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
const urlSaveImgStr = Constants.EVENT_BANNER_IMAGE_UPLOAD;
const urlStr = Constants.EVENT_UPDATE_URL;
const urlEventStr    = Constants.EVENT_DETAILS_URL;
const token     = localStorage.getItem('token');

class EventEditForm extends React.Component{
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
            hasDError       : '',
            hasSError       : '',
            isOverlay       : true,
            event           : {},
            pictures        : [],
            text            : '',
            longdescription : '',
            time            : '10:00',
            ImageGallery    : [
                {
                        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
                        thumbnailWidth: 320,
                        thumbnailHeight: 174,
                        isSelected: false,
                        caption: "After Rain (Jeshu John - designerspics.com)"
                }
          ]
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleChangeText   = this.handleChangeText.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.getEventDetails= this.getEventDetails.bind(this);
        this.handleChangeLongText =this.handleChangeLongText.bind(this); 
    }

    handleChangeText(changeEvent) {
       this.setState({ text: changeEvent.editor.getData() });
       this.setState({
        event : {
            description : changeEvent.editor.getData()
            }
        });
        
      }


    handleChangeLongText(changeEvent) {
        this.setState({ longdescription: changeEvent.editor.getData() });
        this.setState({
         event : {
             longdescription : changeEvent.editor.getData()
             }
         });
         
       }

    handleChange(e) {
        var strid = e.target.id;
        if(strid=='title'){
            this.setState({
                event : {
                    description : e.target.value
                    }
                });
        }
      
        if(strid=='durration'){
            this.setState({
                event : {
                    durration : e.target.value
                }
            });
        }

        if(strid=='is_feature'){
            this.setState({
                event : {
                    is_feature : e.target.value
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
        var description = this.state.text;
        var longdescription = this.state.longdescription;
        var durration   = event.target.durration.value;
        var status      = event.target.status.value;
        var is_feature  = event.target.is_feature.value;

        //Validation all the fields here
        if(title==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter title of the event', 
                hasTError : 'has-error' });
        }else if(description==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter description of the event', hasDesError : 'has-error' });
        }else if(durration==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose durration of the event', hasDError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the event', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(title!='' && description!='' && durration!=''){
            const formData = {
                event        : {
                    id          : id,
                    title       : title,
                    description : description,
                    long_description:longdescription,
                    durration   : durration,
                    is_feature  : is_feature,
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
            event_id  : this.props.id
        }
        axios.post(urlEventStr, formData)
        .then((response) => {
          if(response.data[0].code==200) {
              this.setState({
                  event       : response.data[0].data,
                  isOverlay   : false,
                  text        : response.data[0].data.description,
                  longdescription:response.data[0].data.long_description,
              });
              $("#descriptionss").val(this.state.text);
              $("#longdescription").val(this.state.longdescription);
              $("#is_feature").val(this.state.event.is_feature);
              $("#status").val(this.state.event.status);
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
        $("#descriptionss").val(this.state.text);
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
        const { ImageGallery }  = this.state;
        const {text}            = this.state;
        const {status}          = this.state;       
    
        console.log("this.event========");
        console.log(this.state.event);
        $('#status').val(this.state.event.status);
        return(
            <div className="row">
            <div className="col-md-12">
            <div className="overlay" show={isOverlay}><i className="fa fa-refresh fa-spin"></i></div>
            {/* <Message title={MsgClass} Msg={Msg} show={show}/> */}
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Edit Event Page:: {this.state.event.title}</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} enctype="multipart/form-data" id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Page Title</dt>
                        <input type="text" className="form-control" id="title" placeholder="Enter event title" value={this.state.event.title} onChange = { this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Description</dt>
                        <CKEditor 
                            id="descriptionss"  
                            data={this.state.text}  
                            type="classic"
                            onChange={this.handleChangeText}
                            
                        />
                    </div>
                    
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Long Description</dt>
                        <CKEditor 
                            id="longdescription"  
                            data={this.state.longdescription}  
                            type="classic"
                            onChange={this.handleChangeLongText}
                            
                        />
                    </div>

                    <div className="bootstrap-timepicker">
                    <div className={"form-group"+" "+hasDError}>
                    <dt>Event Durration:</dt>
                    <small>Total durration of the event in minutes only</small>
                    <div className="input-group">
                        <input type="text" class="form-control timepicker" id="durration" name="durration" onChange={this.handleChange} value={this.state.event.durration}/>
                        <div className="input-group-addon">
                        <i className="fa fa-clock-o"></i>
                        </div>
                    </div>
                    </div>
                    </div> 
                    <div className={"form-group"+" "+hasSError}>
                    <dt htmlFor="inputEmail3">Feature Event</dt>
                            <select className="form-control" id="is_feature" onChange={this.handleChange}>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                     </div>
                     
                     <div className={"form-group"+" "+hasSError}>
                    <dt htmlFor="inputEmail3">Status</dt>
                            <select className="form-control" id="status" onChange={this.handleChange} value={status}>
                                <option value="0">In Active</option>
                                <option value="1" selected="selected">Active</option>
                            </select>
                     </div>
                      
                   
                    
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                    <a href={"/eventlist"} className="btn btn-danger">Cancel</a>&nbsp;
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

export default EventEditForm;

