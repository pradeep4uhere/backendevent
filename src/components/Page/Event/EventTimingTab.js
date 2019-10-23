/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../../config/Constants'
import 'rc-time-picker/assets/index.css';
const urlEventStr    = Constants.EVENT_DETAILS_URL;
const urlStr = Constants.THEATRE_LIST_URL;
const urlEventTimeUpdate = Constants.EVENT_TIME_UPDATE_URL;
const token     = localStorage.getItem('token');
class EventTimingTab extends React.Component{
    constructor(props) {
        super(props);

          
        this.state = {
          eventId : this.props.eventId,
          event : this.props.eventObj,
          theater : [],
          message : '',
          classstr:'',
          isMsg   :false,
          className:'',
          eventDetails: this.props.eventObj.event_detail,
          event_detail_id:''


        };
        this.getEventDetails  = this.getEventDetails.bind(this);
        this.getTheatreList  = this.getTheatreList.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
    }


    getTheatreList(){
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            event_id  : this.state.event_id
        }
        axios.post(urlStr, formData)
        .then((response) => {
          var response = response.data; 
          if(response.code==200) {
            
                this.setState({
                  theater    : response.theatre.data,
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



    getEventDetails(){
      var tokenStr = token;
      const formData = {
          token     : tokenStr,
          event_id  : this.props.eventId
      }
      //alert(formData.event_id);
      axios.post(urlEventStr, formData)
      .then((response) => {
        var response = response.data; 
        if(response.code==200) {
              this.setState({
                event    : response.event.data,
              });
              console.log("++++++++++++++++++++sss++++++++++++++++");
              console.log(this.state.event);
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
      this.getTheatreList();
      this.getEventDetails();
    }



    handleSubmit(event){
      var tokenStr = token;
      event.preventDefault();
      var theater_id      = event.target.theater_id.value;
      var event_start_time= event.target.event_start_time.value;
      var event_end_time  = event.target.event_end_time.value;
      var event_id        = this.props.eventObj.id;
      const formData = {
          token           : tokenStr,
          event_id        : event_id,
          theater_id      : theater_id,
          event_start_time: event_start_time,
          event_end_time  : event_end_time
      }
      axios.post(urlEventTimeUpdate, formData)
      .then((response) => {
        response = response.data[0];
        if(response.code==200) {
          console.log(response);
                this.setState({
                  message     : response.message,
                  classstr    : 'alert alert-success',
                  className   : 'success',
                  isMsg       : true,
            });
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
    render(){
      let string = JSON.stringify(this.props.eventDetails);
      const { event } = this.state;
      const { theater } = this.state;
      const { isMsg }         = this.state;
      const { classstr }      = this.state;
      const { message }       = this.state;
      let theatreListOption = this.state.theater.map((val,i) =>
        <option value={val.id}>{val.theater_name}</option>
      );
      return(
            <div className="row">
            <div className="col-md-12">
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fa fa-text-width" />
                <h3 className="box-title">Event Timing</h3>
              </div>
              <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                <div className="box-body">
               
                    <div className={"form-group col-md-8"}>
                        <dt>Event Detail</dt>
                        <p>{this.props.eventObj.title}</p>
                    </div>
                    <div className={"form-group col-md-8"}>
                        <dt>Theatre Detail</dt>
                        <select className="form-control" id="theatre_id" name="theater_id">
                        <option value="">Choose Theater</option>
                         { theatreListOption }
                        </select>
                    </div>
                    <div className="bootstrap-timepicker col-md-8">
                    <div className={"form-group"}>
                    <dt>Event Start time:</dt>
                    <small>Total durration of the event in minutes only</small>
                    <div className="input-group">
                      <input type="text" class="form-control timepicker" id="event_start_time" name="event_start_time"/>
                      <div className="input-group-addon">
                      <i className="fa fa-clock-o"></i>
                      </div>
                    </div>
                    </div>
                    <div className={"form-group"}>
                    <dt>Event End Time:</dt>
                    <small>Total durration of the event in minutes only</small>
                    <div className="input-group">
                      <input type="text" class="form-control timepicker" id="event_end_time" name="event_end_time"/>
                      <div className="input-group-addon">
                      <i className="fa fa-clock-o"></i>
                      </div>
                    </div>
                    </div>
                    </div>                     
                </div>
                <div class="box-footer"><button type="submit" class="btn btn-default">Cancel</button>&nbsp;<button type="submit" class="btn btn-primary">Submit</button></div>
                <input type="text" class="form-control timepicker" id="event_detail_id" />
                </form>
                </div>
             </div>
            </div>
      );
    };    
}
export default EventTimingTab;