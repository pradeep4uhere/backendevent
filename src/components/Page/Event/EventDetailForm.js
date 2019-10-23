/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'

const urlStr = Constants.EVENT_ADD_URL;
const token     = localStorage.getItem('token');
class EventDetailPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all event details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : ''
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
    }
    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var title       = event.target.title.value;
        var description = event.target.description.value;
        var durration   = event.target.durration.value;
        var status      = event.target.status.value;

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
                    title       : title,
                    description : description,
                    durration   : durration,
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
                  this.setState({isMsg:true});
                  this.setState({classstr: 'alert alert-danger'});
              })
    
        }


       
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
        return(
        <section className="content">
        <div className="row">
        <div className="tab_container">
        <input id="tab1" type="radio" name="tabs" defaultChecked />
        <label htmlFor="tab1"><i className="fa fa-pencil-square-o" /><span>Event Information</span></label>
        <input id="tab2" type="radio" name="tabs" />
        <label htmlFor="tab2"><i className="fa fa-map" /><span>Location</span></label>
        <input id="tab3" type="radio" name="tabs" />
        <label htmlFor="tab3"><i className="fa fa-image" /><span>Image Gallery</span></label>
        <input id="tab4" type="radio" name="tabs" />
        <label htmlFor="tab4"><i className="fa fa-clock-o" /><span>Event Timing</span></label>
        <input id="tab5" type="radio" name="tabs" />
        <label htmlFor="tab5"><i className="fa fa-wheelchair" /><span>Seats</span></label>
        <section id="content1" className="tab-content">
        <div className="row">
        <div className="col-md-12">
        <div className="box box-solid">
          <div className="box-header with-border">
            <i className="fa fa-text-width" />
            <h3 className="box-title">Event Details</h3>
          </div>
          {/* /.box-header */}
          <div className="box-body">
            <dl>
              <dt>Title</dt>
              <p>A description list is perfect for defining terms.</p>
              <dt>Description</dt>
              <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
              <dt>Durration</dt>
              <p>Etiam porta sem malesuada magna mollis euismod.</p>
            </dl>
          </div>
          {/* /.box-body */}
        </div>
        {/* /.box */}
      </div>
       
      </div>
        </section>
        <section id="content2" className="tab-content">
          <h4><strong>Location</strong></h4>
          <hr/>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
        </section>
        <section id="content3" className="tab-content">
          <h3>Headline 3</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
           .</p>
        </section>
        <section id="content4" className="tab-content">
          <h3>Headline 4</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.</p>
        </section>
        <section id="content5" className="tab-content">
          <h3>Headline 5</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
        </section>
      </div>
       
          
        </div>
        {/* /.row */}
      </section>
      );
    };
}

export default EventDetailPage;
