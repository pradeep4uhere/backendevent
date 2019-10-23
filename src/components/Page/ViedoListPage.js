/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../config/Constants'
import Breadcrum from '../BreadcrumPage';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import DeleteImg from '../../theme/dist/img/recycle.png';
import DoneImg from '../../theme/dist/img/done.png';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
const urlEventStr    = Constants.EVENT_DETAILS_URL;
const urlStr = Constants.THEATRE_LIST_URL;
const urlEventTimeUpdate = Constants.EVENT_TIME_UPDATE_URL;

const urlEventTimeDelete = Constants.EVENT_TIME_DELETE_URL;

const urlVideosList   = Constants.VIEDO_LIST_URL;
const urlVideosUpdate = Constants.VIEDO_UPDATE_URL;
const urlVideoDelete  = Constants.VIEDO_DELETE_URL;
const token     = localStorage.getItem('token');
class EventTimingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          event : '',
          theater : [],
          message : '',
          classstr:'',
          isMsg   :false,
          className:'',
          event_detail:[],
          event_timing:[],
          isOverlay : true,
          noRecords: false,
          show: false,
          sATitle:'',
          sAClass:'',
          sAText:'',
          sAImg:DoneImg,
          showCancelButton:true,
          confirmButtonColor:'#FF0000',
          viedos : [],
          title  : '',
          id     : '',
          url    : '',
          status : ''
        };
        this.getVideosList    = this.getVideosList.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
        this.deleteForm       = this.deleteForm.bind(this);
        this.handleChange     = this.handleChange.bind(this);
        this.editForm         = this.editForm.bind(this);
    }


    handleChange(e) {
      var strid = e.target.id;
      if(strid=='title'){
          this.setState({
                title : e.target.value
              });
      }
    
      if(strid=='embedUrl'){
          this.setState({
                url : e.target.value
          });
      }
      if(strid=='status'){
          this.setState({
                  status : e.target.value
          });
      }
  }


    editForm(event,data){
      event.preventDefault();
      this.setState({
        id:data.id,
        title:data.title,
        status:data.status,
        url:data.url
      });
      $('#status').val(data.status);


    }


    getVideosList(){
      this.setState({
        isOverlay  : true
      });
      var tokenStr = token;
      const formData = {
          token     : tokenStr,
      }
      //alert(formData.event_id);
      axios.post(urlVideosList, formData)
      .then((response) => {
        
        if(response.data.code==200) {
          console.log(response);
            this.setState({
                viedos: response.data.list,
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
      this.getVideosList();
    }



    handleSubmit(event){
      var tokenStr = token;
      event.preventDefault();
      var id              = event.target.id.value;
      var title           = event.target.title.value;
      var url             = event.target.embedUrl.value;
      var status          = event.target.status.value;
      const formData = {
          token           : tokenStr,
          id              : id,
          title           : title,
          url             : url,
          status          : status,
      }
      axios.post(urlVideosUpdate, formData)
      .then((response) => {
        response = response.data;
        if(response.code==200) {
                this.setState({
                  message     : response.message,
                  classstr    : 'alert alert-success',
                  className   : 'success',
                  isMsg       : true,
            });
            this.setState({
              noRecords:false
            });
            this.getVideosList();
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


   


    deleteForm(e,data){
      var tokenStr = token;
      const formData = {
          token           : tokenStr,
          id              : data.id,
      }
      axios.post(urlVideoDelete, formData)
      .then((response) => {
        response = response.data;
        if(response.code==200) {
          this.setState({
                message     : response.message,
                classstr    : 'alert alert-success',
                className   : 'success',
                isMsg       : true,
          });
          this.getVideosList();
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
      const { isMsg }         = this.state;
      const { classstr }      = this.state;
      const { message }       = this.state;
      const { isOverlay }     = this.state;
        let Option = this.state.viedos.map((val,i) =>
              <div className="col-md-4">
              <iframe width={330} height={215} src={val.url} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              <h4 className="box-title pull-left">{val.title}</h4>
              <p className="pull-right">
              {
                (val.status==1)?(<a href="#" className="btn btn-success">Active</a>):(<a href="#" className="btn btn-warning">InActive</a>)
              }
              &nbsp;&nbsp;
              <a href="#" className="btn btn-info" onClick={((e) => this.editForm(e, val))}>Edit</a>&nbsp;&nbsp;
              <a href="#" className="btn btn-danger" onClick={((e) => this.deleteForm(e, val))}>Remove</a>
              </p>  
              </div>
        );
        return(
            <div className="content-wrapper">
            <Breadcrum title="All Viedos" titleRight='All Event List' url='eventlist' />
            <section className="content">
            <div className="row">
             <div className="col-md-8">
            <div className="box box-solid">
            <div className="overlay" show={isOverlay}><i className="fa fa-refresh fa-spin"></i></div>
              <div className="box-header with-border">
                <i className="fa fa-text-width" />
                <h3 className="box-title">All List</h3>
              </div>

              <div className="box-body no-padding">
              {Option}
              </div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fa fa-text-width" />
                <h3 className="box-title">Add Viedo</h3>
              </div>
              {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
              <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                <div className="box-body">
                    <div className={"form-group col-md-12"}>
                    <dt>Enter Title</dt>
                      <input type="text" className="form-control " id="title" name="title" value={this.state.title} onChange = { this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group col-md-12"}>
                    <dt>YouTube Embed URL </dt>
                      <input type="text" className="form-control " id="embedUrl" name="embedUrl" value={this.state.url} onChange = { this.handleChange.bind(this)}/>
                      
                    <small>(e.g https://www.youtube.com/embed/VLG-G9fxGxI)</small>
                    </div>
                    <div className={"form-group col-md-12"}>
                        <dt>Status</dt>
                        <select className="form-control" id="status" onChange = { this.handleChange.bind(this)}>
                        <option value="1">Active</option>
                        <option value="0">In Active</option>
                        </select>
                    </div>                    
                </div>
                <div class="box-footer">
                <input type="hidden" id="id"  class="form-control" value={this.state.id}/>
                <button type="submit" class="btn btn-primary  pull-right">Submit</button>&nbsp;&nbsp;
                <button type="reset" class="btn btn-danger  pull-right" style={{"margin-right":"5px"}}>Reset</button>&nbsp;&nbsp;
                </div>
                </form>
                </div>
             </div>
            
            </div>
            
            </section>
            </div>
            )
    };


   
    
}

export default EventTimingPage;