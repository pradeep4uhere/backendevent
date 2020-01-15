/*
 * @PageName    :: OfferManagePage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 15 JAN 2019
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
import "react-tabs/style/react-tabs.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';  
var serialize = require('form-serialize');
const urlEventStr    = Constants.OFFER_LIST;
const urlMembershipUpdate = Constants.OFFER_UPDATE_URL;
const urlTimeDelete = Constants.OFFER_DELETE_URL;
const token     = localStorage.getItem('token');
class OfferManagePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          id : this.props.id,
          membership:[],
          taxList:[],
          message : '',
          classstr:'',
          isMsg   :false,
          className:'',
          messageP : '',
          classstrP:'',
          isMsgP   :false,
          classNameP:'',
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
        this.handleChange1    = this.handleChange1.bind(this);
        this.handleChange2    = this.handleChange2.bind(this);

    }

    handleChange1 = date => {
        this.setState({
            startDate: date
        });
    };

    handleChange2 = date => {
        this.setState({
            endDate: date
        });
    };

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
          id        : this.props.id
      }
      axios.post(urlEventStr, formData)
      .then((response) => {
          
        if(response.data.code==200) {
            //console.log(response.data.membership);
            this.setState({
                taxList : response.data.offerList,
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
      var id                = $('#id').val();
      var offer_name        = event.target.offer_name.value;
      var offer_code        = event.target.offer_code.value;
      var offer_type        = event.target.offer_type.value;
      var offer_value       = event.target.offer_value.value;
      var valid_from        = event.target.valid_from.value;
      var valid_untill      = event.target.valid_untill.value;
      var status            = event.target.status.value;
      const form = event.currentTarget
      const body = serialize(form, {hash: true,empty:true})
      const formData = {
          token             : tokenStr,
          offer_name        : offer_name,
          offer_code        : offer_code,
          offer_type        : offer_type,
          offer_value       : offer_value,
          valid_from        : valid_from,
          valid_untill      : valid_untill,
          status            : status,
          id                : id,
      }
      axios.post(urlMembershipUpdate, formData)
      .then((response) => {
        if(response.data.code==200) {
                this.setState({
                  message     : response.data.message,
                  classstr    : 'alert alert-success',
                  className   : 'success',
                  isMsg       : true,
                  noRecords:false
            });
            $('#feature_title').val('');
            $('#id').val('');
            this.getItinerariesDetails();
        }
        else
        {
          this.setState({isMsg:true});
          this.setState({className:'error'});
          this.setState({
            message     : response.data.message,
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
        $('#id').val(obj.id);
        $('#offer_name').val(obj.offer_name);
        $('#offer_code').val(obj.offer_code);
        $('#offer_type').val(obj.offer_type);
        $('#offer_value').val(obj.offer_value);
        $('#valid_from').val(obj.valid_from);
        $('#valid_untill').val(obj.valid_untill);
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
      var membership_feature_id  = strId;
      this.setState({
          sATitle : 'Are you sure ?',
          sAClass : 'error',
          sAText  : 'You want to delete Offer type',
          show    : true,
          sAImg   : DeleteImg,
          membership_feature_id:membership_feature_id,
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
          id              : this.state.membership_feature_id,
      }
      axios.post(urlTimeDelete, formData)
      .then((response) => {
        if(response.data.code==200) {
            this.setState({ 
              show    : false,
              confirmButtonColor:'#008000'
            })
          this.getItinerariesDetails();
          this.setState({ 
            sATitle : 'Deleted !',
            sAClass : 'Success',
            sAText  : 'Offer Type Deleted!',
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
      const { membership }    = this.state;
      const {taxList}         = this.state;
      const { isMsg }         = this.state;
      const { classstr }      = this.state;
      const { message }       = this.state;
      const { isOverlay }     = this.state;
      const { isMsgP }         = this.state;
      const { classstrP }      = this.state;
      const { messageP }       = this.state;
      const { isOverlayP }     = this.state;
      let membershipFeatureStr = '';
      if(taxList.length>0){
          console.log(membership.membership_feature);
        membershipFeatureStr = taxList.map((key,k) =>
            <tr>
              <td width="1%">{k+1}</td>
              <td>{key.offer_name}</td>
              <td>{key.offer_code}</td>
              <td>{key.offer_type}</td>
              <td>{key.offer_value}</td>
              <td><Moment format="DD-MMM-YYYY">{key.valid_from}</Moment></td>
              <td><Moment format="DD-MMM-YYYY">{key.valid_untill}</Moment></td>
              <td>{(key.expire=='Active')?(<span className="badge bg-green">Active</span>):(<span className="badge bg-red">Expire</span>)}</td>
              <td>{(key.status==1)?(<span className="badge bg-green">Active</span>):(<span className="badge bg-red">In Active</span>)}</td>
              <td>
                <a href="#"><i className="fa fa-pencil" onClick={((e) => this.EditTime(e, key))}></i></a>&nbsp;&nbsp;
                <a href="#"><i className="fa fa-trash" onClick={((e) => this.DeleteTime(e, key))}  id={key.id}></i></a>
              </td>
            </tr>
        );
      }

      let membershipPriceStr = '';
      if(membership.length>0){
          console.log(membership);
          membershipPriceStr = 
            <tr>
              <td width="1%">1</td>
              <td>{membership.name}</td>
              <td>{(membership.status==1)?(<span className="badge bg-green">Active</span>):(<span className="badge bg-red">In Active</span>)}</td>
              <td>
                <a href="#"><i className="fa fa-pencil" onClick={((e) => this.EditTime(e, membership))}></i></a>&nbsp;&nbsp;
                <a href="#"><i className="fa fa-trash" onClick={((e) => this.DeleteTime(e, membership))}  id={membership.id}></i></a>
              </td>
            </tr>
      }
      return(

            <div className="content-wrapper">
            <Breadcrum title="Coupon Type" titleRight='Dashboard' url='/dashboard' />
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
              <div className="box-header with-border bg-warning">
              <i className="fa fa-gift"></i>
                <h3 className="box-title box-widget">Coupon Type List</h3>
              </div>
              <div className="box-body no-padding">
              <table className="table table-striped" style={{'font-size':'12px'}}>
                <tbody><tr>
                  <th>#</th>
                  <th style={{'white-space':'nowrap'}}>Offer Name</th>
                  <th>Coupon Code</th>
                  <th>Coupon Type</th>
                  <th>Coupon Value</th>
                  <th>Valid From</th>
                  <th>Valid End</th>
                  <th>Offer Status</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {membershipFeatureStr}
              </tbody></table>
            </div>
            </div>
            </div> 
            
            <div className="col-md-4">
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fa fa-pencil" />
                <h3 className="box-title">Add/Update Coupon Type</h3>
                <a href={"/offer"} className="pull-right btn btn-sm btn-danger"><i className="fa fa-plus"></i>&nbsp;Add New Coupon</a>
              </div>
              {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
              <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                <div className="box-body">
                    <div className={"form-group col-md-12"}>
                        <dt>Coupon Name</dt>
                        <input type="text" id="offer_name" className="form-control"/>
                        <input type="hidden" id="id" className="form-control"/>
                    </div>
                    <div className={"form-group col-md-12"}>
                        <dt>Coupon Code<sup>*</sup></dt>
                        <input type="text" id="offer_code" className="form-control" />
                    </div>
                    <div className={"form-group col-md-12"}>
                        <dt>Offer Type</dt>
                        <select className="form-control" id="offer_type">
                        <option value="FLAT">FLAT</option>
                        <option value="PERCENTAGE" selected="selected">PERCENTAGE</option>
                        </select>
                    </div>  
                    <div className={"form-group col-md-12"}>
                        <dt>Offer Value</dt>
                        <input type="number" id="offer_value" className="form-control" />
                    </div>  
                    <div className={"form-group col-md-12"}>
                        <dt>Offer Start Date</dt>
                        <DatePicker id="valid_from"
                            selected={this.state.startDate}
                            onChange={this.handleChange1}
                            style={{'border':'solid 1px #CCC'}}
                        />
                    </div>  
                    <div className={"form-group col-md-12"}>
                        <dt>Offer End Date</dt>
                        <DatePicker id="valid_untill"
                            selected={this.state.endDate}
                            onChange={this.handleChange2}
                        />
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

export default OfferManagePage;