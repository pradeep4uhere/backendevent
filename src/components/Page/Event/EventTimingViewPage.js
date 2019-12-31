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
import Breadcrum from '../../BreadcrumPage';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import DeleteImg from '../../../theme/dist/img/recycle.png';
import DoneImg from '../../../theme/dist/img/done.png';
import SittingType from '../../../json/SittingType';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import CKEditor from 'ckeditor4-react';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

var serialize = require('form-serialize');

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
const urlEventStr    = Constants.EVENT_DETAILS_URL;
const urlStr = Constants.THEATRE_LIST_URL;
const urlEventTimeUpdate = Constants.EVENT_TIME_UPDATE_URL;
const urlEventTimeDelete = Constants.EVENT_TIME_DELETE_URL;
const token     = localStorage.getItem('token');
const APP_FRONT =Constants.APP_FRONT;
class EventTimingViewPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          eventId : this.props.id,
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
          priceObj: {
                  sitting_type_id : '',
                  price           : '',
          },
          priceRow:[{
            sitting_type_id : '',
            price           : '',
          }],
          SittingType : SittingType,
          showRemoveBtn:false,
          itinerary: 'Enter itinerary details here',
          includes : 'Enter includes details here',
          dincludes: 'Enter do not includes details here',
          other    : 'Enter other details here',
          titleText: 'Add',
          value: moment(),
          thvalue:'',
          theaterTiming:[]
        };
        this.getEventDetails  = this.getEventDetails.bind(this);
        this.getTheatreList   = this.getTheatreList.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
        this.EditTime         = this.EditTime.bind(this);
        this.DeleteTime       = this.DeleteTime.bind(this);
        this.DeleteNow        = this.DeleteNow.bind(this);
        this.addRow           = this.addRow.bind(this);
        this.removeRow        = this.removeRow.bind(this);
        this.handleChange     = this.handleChange.bind(this);
        this.handleChangeTextItinerary = this.handleChangeTextItinerary.bind(this);
        this.handleChangeTextIncludes  = this.handleChangeTextIncludes.bind(this);
        this.handleChangeTextDincludes  = this.handleChangeTextDincludes.bind(this);
        this.handleChangeTextOther  = this.handleChangeTextOther.bind(this);
        this.handleTheatreChange  = this.handleTheatreChange.bind(this);
        

        
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



    getEventDetails(){
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
        //console.log(response.data[0]);
        if(response.data[0].code==200) {
            this.setState({
                event       : response.data[0],
                event_detail: response.data[0].data.event_detail,
                isOverlay  : false
            });
            // this.state.priceRow.push({
            //   sitting_type_id : '',
            //   price           : '',
            // });
            if(response.data[0].data.event_detail.length==0){
              this.setState({
                noRecords:true
              });
            }else{
              this.setState({
                noRecords:false
              });
            }
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



    handleTheatreChange(event){
      let thId = event.target.value;
      let index = 0;
      let temData = [];
      this.state.theater.map((val,i) =>
        {
          if(val.id==thId){
            let temData = this.state.theater[i].event_timing;
            this.setState({theaterTiming:temData});
          }
        }
      );
      //  console.log("this.setState.theaterTiming",this.state.theaterTiming)
    }


    handleSubmit(event){
      var tokenStr = token;
      event.preventDefault();
      var id              = event.target.id.value;
      var event_detail_id = event.target.event_detail_id.value;
      var theater_id      = event.target.theater_id.value;
      var event_start_time= event.target.event_start_time.value;
      var event_end_time  = event.target.event_end_time.value;
      var status          = event.target.status.value;
      var event_id        = this.props.id;
      const form = event.currentTarget
      const body = serialize(form, {hash: true,empty:true})
     
      const formData = {
          token           : tokenStr,
          event_id        : event_id,
          theater_id      : theater_id,
          event_start_time: event_start_time,
          event_end_time  : event_end_time,
          event_detail_id : event_detail_id,
          status          : status,
          id              : id,
          itinerary       : this.state.itinerary,
          includes        : this.state.includes,
          dincludes       : this.state.dincludes,
          other           : this.state.other,
          body            : body
      }
      axios.post(urlEventTimeUpdate, formData)
      .then((response) => {
        response = response.data[0];
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
            this.getEventDetails();
        }
        else
        {
          this.setState({isMsg:true});
          this.setState({className:'error'});
          this.setState({
              message     : response.message,
              classstr    : 'alert alert-danger',
              className   : 'error',
              isMsg       : true,
           });
        }
      })
      .catch((err) => {
          this.setState({isMsg:true});
          this.setState({className:'error'});
      })
    }

    //Open Modle box for user Either we can view or edit the user details here
    EditTime(e,obj) {
      this.setState({titleText:'Update'});
      $('#event_detail_id').val(obj.event_detail_id);
      $('#theatre_id').val(obj.theatre_id);
      $('#event_start_time').val(obj.event_start_time);
      $('#event_end_time').val(obj.event_end_time);
      this.setState({itinerary:obj.itinerary});
      this.setState({includes:obj.includes});
      this.setState({dincludes:obj.dincludes});
      this.setState({other:obj.other});
      $('#status').val(obj.status);
      $('#id').val(obj.id);
      //Update the Price Object
      var price = obj.price;
      this.state.priceRow =[];
      price.map((val,i)=>
        this.state.priceRow.push({
          sitting_type_id : val.sitting_type_id,
          price           : val.price,
        })
      )
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
          sAText  : 'You want to delete event timing  ',
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
      axios.post(urlEventTimeDelete, formData)
      .then((response) => {
        response = response.data[0];
        if(response.code==200) {
            this.setState({ 
              show    : false,
              confirmButtonColor:'#008000'
            })
          this.getEventDetails();
          this.setState({ 
            sATitle : 'Deleted !',
            sAClass : 'Success',
            sAText  : 'Event Timing Deleted!',
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

    addRow(){
      if(this.state.priceRow.length<=(this.state.SittingType.length-1)){
        //console.log("============================");
        let priceObj = {sitting_type_id : '', price : ''};
        //console.log(this.state.priceRow);
        //console.log(priceObj);
        this.state.priceRow.push(priceObj)
        //console.log(this.state.priceRow);
      }else{
        this.setState({
          message     : "No more seat type availabe.",
          classstr    : 'alert alert-danger',
          className   : 'error',
          isMsg       : true,
         });
      }
    }


    removeRow(){
      if(this.state.priceRow.length>1){
          this.state.priceRow.pop()
      }
    }


    handleChangeTextItinerary(changeEvent) {
      this.setState({
            itinerary : changeEvent.editor.getData()
       });
     }


     handleChangeTextIncludes(changeEvent) {
      this.setState({
          includes : changeEvent.editor.getData()
       });
     }


     handleChangeTextDincludes(changeEvent) {
      this.setState({
          dincludes : changeEvent.editor.getData()
       });
     }


     handleChangeTextOther(changeEvent) {
      this.setState({
          other : changeEvent.editor.getData()
       });
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
      const { titleText }     = this.state;
      console.log(this.state);
      let timingOption = this.state.event_detail.map((val,i) =>
            val.event_timing.map((key,k)=> 
            <tr>
              <td width="1%">{k+1}</td>
              <td width="20%">{key.theatre.theater_name}</td>
              <td width="30%">{key.theatre.address}</td>
              <td nowrap="nowrap"><table>
                  <tr className="table-info">
                    <td>Type</td>
                    <td>Price</td>
                  </tr>
                {key.price.map(j => {
                  return (
                      <tr>
                        <td>{j.sitting_type.sitting_type_name}</td>
                        <td><i className="fa fa-inr"></i>{j.price}</td>
                      </tr>
                  )
                
              })}</table></td>
              <td>{key.event_start_time}</td>
              <td>{key.event_end_time}</td>
              <td>{(key.status==1)?(<span className="badge bg-green">Active</span>):(<span className="badge bg-red">In Active</span>)}</td>
            </tr>
            )
        );
      

      let eventDetailListOption = '';
      let eventTitle = '';
      let eventId = '';
     // let theatreTimeLists = '';
      if(this.state.event.data){
        console.log("this.state.event_detail===========",this.state.event);
        eventDetailListOption = this.state.event_detail.map((val,i) =>
          <option value={val.id}>{val.event.title}</option>
        );
        eventTitle = this.state.event.data.title;
        if(event_detail.length){
          eventId = this.state.event_detail[0].id;
        }
      }
      
      
      let theatreListOption = this.state.theater.map((val,i) =>
        <option value={val.id}>{val.theater_name}</option>
      );


      let theatreTimeLists = this.state.theaterTiming.map((val,i) =>
                <tr>
                  <td>{i+1}</td>
                  <td>{val.event_start_time}</td>
                  <td>{val.event_end_time}</td>
                </tr>
      );

      let sittingTypeOption = this.state.SittingType.map((val,i) =>
          <option value={val.id}>{val.sitting_type_name}</option>
      );

      let priceRowElement =  this.state.priceRow.map((val,i) =>
            <div>
            <div className="col-md-6">
              <div className={"form-group"}>
              < dt>Sitting Type:</dt>
                <div className="input-group">
                  <select class="form-control" name="sitting_type_id[]" id={"sitting_type_id__"+i} style={{height: '28px'}} value={val.sitting_type_id} onChange = { this.handleChange.bind(this)}>
                  {sittingTypeOption}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className={"form-group"}>
                <dt>Price:</dt>
                <div className="input-group">
                  <div className="input-group-addon">
                      <i className="fa fa-inr"></i>
                  </div>
                  <input type="text" class="form-control" name="price[]" id={"price__"+i} style={{height: '28px'}} value={val.price} onChange = { this.handleChange.bind(this)}/>
                </div>
              </div>
            </div>
            </div>
      );

      let { showRemoveBtn } = this.state
      console.log(this.state);

      return(
            <div className="row">
            <div className="col-md-8">
            <div className="box box-solid">
             <div className="box-body no-padding">
              <table className="table table-striped" style={{'font-size':'12px'}}>
                <tbody><tr>
                  <th>#</th>
                  <th>Theater Name</th>
                  <th>Address</th>
                  <th>Sitting Type / Price</th>
                  <th style={{'white-space':'nowrap'}}>Start Time</th>
                  <th style={{'white-space':'nowrap'}}>End Time</th>
                  <th>View</th>
                </tr>
                {timingOption}
                {/* <tr><td colspan="7"><div className="alert alert-danger" show={this.state.noRecords}>No Records Found</div></td></tr> */}
              </tbody></table>
            </div>
            </div>
            </div>
            
            
            </div>
            
            )
            
    };


   
    
}

export default EventTimingViewPage;