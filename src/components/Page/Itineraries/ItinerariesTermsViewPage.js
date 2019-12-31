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
import CKEditor from 'ckeditor4-react';
var serialize = require('form-serialize');
const urlEventStr    = Constants.ITINERARIES_URL;
const urlItineraryUpdate = Constants.ITINERARIES_ADDON_UPDATE_URL;
const urlTimeDelete = Constants.ITINERARIES_ADDON_DELETE_URL;
const token     = localStorage.getItem('token');
class ItinerariesTermsViewPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          eventId : this.props.id,
          itinerariesName: '',
          itinerariesId:'',
          itinerary_departure:[],
          itinerary_terms:[],
          setting:[],
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
          showRemoveBtn:false
        };
        this.getItinerariesDetails  = this.getItinerariesDetails.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
        this.EditTime         = this.EditTime.bind(this);
        this.DeleteTime       = this.DeleteTime.bind(this);
        this.DeleteNow        = this.DeleteNow.bind(this);
        this.handleChange     = this.handleChange.bind(this);
        this.handleChangeAddOn= this.handleChangeAddOn.bind(this);
        
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
          console.log(response.data[0]);
            this.setState({
                event       : response.data[0],
                event_detail: response.data[0].data,
                itinerary_addon:response.data[0].data.itinerary_terms_and_conditions,
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
      var title           = event.target.title.value;
      var descriptions    = this.state.addon;
      var status          = event.target.status.value;
      const form = event.currentTarget
      const body = serialize(form, {hash: true,empty:true})
      const formData = {
          token           : tokenStr,
          itinerary_id    : itinerary_id,
          title           : title,
          description     : this.state.addon,
          type            : 2,
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
            $('#id').val('');
            $('#title').val('');
            this.setState({addon:''});
            $('#status').val(1);
            $('#id').val('');
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
      $('#title').val(obj.title);
      this.setState({addon:obj.descriptions});
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
          sAText  : 'You want to delete itineriy addon',
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
            sAText  : 'Itineriy departure Timing Deleted!',
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

    handleChangeAddOn(changeEvent) {
      this.setState({ addon: changeEvent.editor.getData() });
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
      timingOption = this.state.itinerary_addon.map((key,k) =>
            <tr>
              <td width="1%">{k+1}</td>
              <td width="20%">{key.title}</td>
              <td width="60%"><div dangerouslySetInnerHTML={{ __html: key.descriptions }}/></td>
              <td width="10%">{(key.status==1)?(<span className="badge bg-green">Active</span>):(<span className="badge bg-red">In Active</span>)}</td>
            </tr>
        );
      }
      let eventDetailListOption = '';
      let eventTitle = '';
      let eventId = '';
      let { showRemoveBtn } = this.state
      return(
            <div className="row">
             <div className="col-md-12">
            <div className="box box-success">
            <div className="overlay" show={isOverlay}><i className="fa fa-refresh fa-spin"></i></div>
              <div className="box-body no-padding">
              <table className="table table-striped" style={{'font-size':'12px'}}>
                <tbody><tr>
                  <th>#</th>
                  <th style={{'white-space':'nowrap'}}>Title</th>
                  <th style={{'white-space':'nowrap'}}>Description</th>
                  <th>Status</th>
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

export default ItinerariesTermsViewPage;