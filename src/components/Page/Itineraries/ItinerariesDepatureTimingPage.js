/*
 * @PageName    :: ItinerariesDepatureTimingPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 18 Oct 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../../config/Constants'
import Breadcrum from '../../BreadcrumPage';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import DeleteImg from '../../../theme/dist/img/recycle.png';
import DoneImg from '../../../theme/dist/img/done.png';
import "react-tabs/style/react-tabs.css";
import Moment from 'react-moment';  
var serialize = require('form-serialize');
const urlEventStr    = Constants.ITINERARIES_URL;
const urlItineraryUpdate = Constants.ITINERARIES_UPDATE_URL;
const urlTimeDelete = Constants.ITINERARy_DEPARTURE_DELETE_URL;
const token     = localStorage.getItem('token');
class ItinerariesDepatureTimingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          eventId : this.props.id,
          itinerariesName: '',
          itinerariesId:'',
          itinerary_departure:[],
          setting:[],
          event : '',
          theater : [],
          message : '',
          classstr:'',
          isMsg   :false,
          className:'',
          event_detail:[],
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
          showRemoveBtn:false
        };
        this.getItinerariesDetails  = this.getItinerariesDetails.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
        this.EditTime         = this.EditTime.bind(this);
        this.DeleteTime       = this.DeleteTime.bind(this);
        this.DeleteNow        = this.DeleteNow.bind(this);
        this.handleChange     = this.handleChange.bind(this);
        
    }

    handleChange(e) {
      let data = this.state.priceRow;
      let idStr = e.target.id.split("__");
      data[idStr[1]][idStr[0]] = e.target.value;;
      this.setState({
        priceRow : data
      });
      //  console.log(this.state.priceRow);
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
                event       : response.data[0],
                event_detail: response.data[0].data,
                itinerary_departure:response.data[0].data.itinerary_departure,
                itinerariesName:response.data[0].data.title,
                itinerariesId:response.data[0].data.id,
                setting:response.data[0].data.setting,
                isOverlay  : false,

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
      this.getItinerariesDetails();
    }



    handleSubmit(event){
      var tokenStr = token;
      event.preventDefault();
      var id              = event.target.id.value;;
      var itinerary_id    = event.target.itinerary_id.value;
      var start_date      = event.target.start_date.value;
      var end_date        = event.target.end_date.value;
      var price           = event.target.price.value;
      var status          = event.target.status.value;
      const form = event.currentTarget
      const body = serialize(form, {hash: true,empty:true})
      const formData = {
          token           : tokenStr,
          itinerary_id    : itinerary_id,
          start_date      : start_date,
          end_date        : end_date,
          price           : price,
          status          : status,
          id              : id,
          body            : body
      }
      axios.post(urlItineraryUpdate, formData)
      .then((response) => {
        response = response.data[0];
        console.log(response);
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
            this.getItinerariesDetails();
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

    //Open Modle box for user Either we can view or edit the user details here
    EditTime(e,obj) {
      console.log(obj);
      $('#id').val(obj.id);
      $('#theatre_id').val(obj.theatre_id);
      $('#price').val(obj.price);
      $('#start_date').val(obj.start_date);
      $('#end_date').val(obj.end_date);
      $('#status').val(obj.status);
      $('#id').val(obj.id);
    }



    DeleteTime(e){
      if(e==undefined || e==''){
        this.setState({
          show    : false,
          
        });
      }
      var strId   = e.target.id;
      var array   = strId.split("|");
      var event_detail_id  = array[0];
      this.setState({ 
          sATitle : 'Are you sure ?',
          sAClass : 'error',
          sAText  : 'You want to delete itineriy departure',
          show    : true,
          sAImg   : DeleteImg,
          event_detail_id:event_detail_id,
          confirmButtonColor:'#FF0000',
          showCancelButton:true,
      })
    }


    DeleteNow(e){
      if(e==undefined || e==''){
        this.setState({
          show    : false,
        });
      }
      var tokenStr = token;
      const formData = {
          token           : tokenStr,
          id              : e,
      }
      axios.post(urlTimeDelete, formData)
      .then((response) => {
        response = response.data[0];
        if(response.code==200) {
            this.setState({ 
              show    : false,
              confirmButtonColor:'#008000'
            })
          this.getItinerariesDetails();
          this.setState({ 
            sATitle : 'Deleted !',
            sAClass : 'Success',
            sAText  : 'Travel Experience departure Timing Deleted!',
            sAImg   : DoneImg,
            show    : true,
            event_detail_id:'',
            showCancelButton:false,
            confirmButtonColor:'#008000'
          })
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
      const { event } = this.state;
      const { theater } = this.state;
      const { isMsg }         = this.state;
      const { classstr }      = this.state;
      const { message }       = this.state;
      const { event_detail }  = this.state;
      const { isOverlay }     = this.state;
      const { noRecords }     = this.state;
      const { itinerary_departure } = this.state;
      const { setting } = this.state;
      let timingOption ='';
      if(itinerary_departure.length>0){
      timingOption = this.state.itinerary_departure.map((key,k) =>
            <tr>
              <td width="1%">{k+1}</td>
              <td><Moment format="DD-MMM-YYYY">{key.start_date}</Moment></td>
              <td><Moment format="DD-MMM-YYYY">{key.end_date}</Moment></td>
              <td width="20%">{setting[14].options_value}{key.price}</td>
              <td>{(key.status==1)?(<span className="badge bg-green">Active</span>):(<span className="badge bg-red">In Active</span>)}</td>
              <td>
                <a href="#"><i className="fa fa-pencil" onClick={((e) => this.EditTime(e, key))}></i></a>&nbsp;&nbsp;
                <a href="#"><i className="fa fa-trash" onClick={this.DeleteTime} id={key.id}></i></a>
              </td>
            </tr>
        );
      }
      let eventDetailListOption = '';
      let eventTitle = '';
      let eventId = '';
      let { showRemoveBtn } = this.state
      return(

            <div className="content-wrapper">
            <Breadcrum title="Edit Travel Experience Departure Date" titleRight='All Travel Experience List' url='allitineraries' />
            <SweetAlert
              dangerMode={true}
              showCancelButton={this.state.showCancelButton}
              animation={true}
              imageUrl={this.state.sAImg}
              imageSize='80x80'
              confirmButtonColor={this.state.confirmButtonColor}
              onCancel={() => this.setState({ show: false })}
              show={this.state.show}
              title={this.state.sATitle}
              text={this.state.sAText}
              icon="warning"
              onConfirm={() => this.DeleteNow(this.state.event_detail_id)}
            />
            <section className="content">
            <div className="row">
              
             <div className="col-md-8">
            <div className="box box-solid">
            <div className="overlay" show={isOverlay}><i className="fa fa-refresh fa-spin"></i></div>
              <div className="box-header with-border">
              <i className="glyphicon glyphicon-calendar"></i>
                <h3 className="box-title">{this.state.itinerariesName} Travel Experience Departure List</h3>
              </div>
              <div className="box-body no-padding">
              <table className="table table-striped" style={{'font-size':'12px'}}>
                <tbody><tr>
                  <th>#</th>
                  <th style={{'white-space':'nowrap'}}>Start Date</th>
                  <th style={{'white-space':'nowrap'}}>End Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {timingOption}
                {/* <tr><td colspan="7"><div className="alert alert-danger" show={this.state.noRecords}>No Records Found</div></td></tr> */}
              </tbody></table>
            </div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fa fa-pencil" />
                <h3 className="box-title">Add/Update Travel Experience Departure</h3>
              </div>
              {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
              <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                <div className="box-body">
                    <div className={"form-group col-md-12"}>
                        <dt>Travel Experience Detail</dt>
                        <input type="text" id="itinerary_name" className="form-control" value={this.state.itinerariesName} readOnly="readonly"/>
                        <input type="hidden" id="itinerary_id" className="form-control" value={this.state.itinerariesId} />
                    </div>
                    <div className={"form-group col-md-12"}>
                        <dt>Travel Experience Price</dt>
                        <input type="text" id="price" className="form-control" />
                    </div>
                    <div className="bootstrap-timepicker col-md-6">
                    <div className={"form-group"}>
                    <dt>Travel Experience Start Date:</dt>
                    <div className="input-group">
                      
                      <div className="input-group-addon">
                      <i className="glyphicon glyphicon-calendar"></i>
                      </div>
                      <input type="text" class="form-control datepicker" id="start_date" name="start_date"/>
                    </div>
                    </div>
                    </div>
                    <div className="bootstrap-timepicker col-md-6">
                    <div className={"form-group"}>
                    <dt>Travel Experience End Date:</dt>
                    <div className="input-group">
                      <div className="input-group-addon">
                      <i className="glyphicon glyphicon-calendar"></i>
                      </div>
                      <input type="text" class="form-control datepicker" id="end_date" name="end_date"/>
                      
                    </div>
                    </div>
                    </div> 
                    <div className={"form-group col-md-12"}>
                        <dt>Status</dt>
                        <select className="form-control" id="status">
                        <option value="1">Active</option>
                        <option value="0">In Active</option>
                        </select>
                    </div>  

                    
                </div>
                <div class="box-footer">
                <input type="hidden" id="id"  class="form-control"/>
                <button type="submit" class="btn btn-primary  pull-right">Submit</button>&nbsp;&nbsp;
                <button type="reset" class="btn btn-warning  pull-right" style={{"margin-right":"5px"}} >Reset</button>&nbsp;&nbsp;
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

export default ItinerariesDepatureTimingPage;