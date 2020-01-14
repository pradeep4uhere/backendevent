/*
 * @PageName    :: ItinerariesDepatureTimingPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 18 Oct 2019
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
import Moment from 'react-moment';  
var serialize = require('form-serialize');
const urlEventStr    = Constants.TAX_LIST;
const urlMembershipUpdate = Constants.TAXTYPE_UPDATE_URL;
const urlTimeDelete = Constants.TAXTYPE_DELETE_URL;
const token     = localStorage.getItem('token');
class TaxEditPage extends React.Component{
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
        this.EditPrice        = this.EditPrice.bind(this);
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
          id        : this.props.id
      }
      axios.post(urlEventStr, formData)
      .then((response) => {
          
        if(response.data.code==200) {
            //console.log(response.data.membership);
            this.setState({
                taxList : response.data.taxList,
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
      var tax_type          = event.target.tax_type.value;
      var value             = event.target.value.value;
      var status            = event.target.status.value;
      const form = event.currentTarget
      const body = serialize(form, {hash: true,empty:true})
      const formData = {
          token             : tokenStr,
          tax_type          : tax_type,
          value             : value,
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
      $('#tax_type').val(obj.tax_type);
      $('#value').val(obj.value);
      $('#status').val(obj.status);
      $('#id').val(obj.id);
    }

    //Open Modle box for user Either we can view or edit the user details here
    EditPrice(e,obj) {
        console.log(obj.monthly_price);
        $('#id').val(obj.id);
        $('#name').val(obj.name);
        $('#monthly_price').val(obj.monthly_price);
        $('#yearly_price').val(obj.yearly_price);
        $('#quarterly_price').val(obj.quarterly_price);
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
          sAText  : 'You want to delete tax type',
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
              <td>{key.tax_type}</td>
              <td>{key.value}%</td>
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
            <Breadcrum title="Edit Tax Type" titleRight='Dashboard' url='/dashboard' />
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
              <i className="fa fa-inr"></i>
                <h3 className="box-title box-widget">Tax Type</h3>
              </div>
              <div className="box-body no-padding">
              <table className="table table-striped" style={{'font-size':'12px'}}>
                <tbody><tr>
                  <th>#</th>
                  <th style={{'white-space':'nowrap'}}>Tax Type</th>
                  <th>Value</th>
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
                <h3 className="box-title">Add/Update Tax Type</h3>
                <a href={"/taxedit"} className="pull-right btn btn-sm btn-danger"><i className="fa fa-plus"></i>&nbsp;Add New TaxType</a>
              </div>
              {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
              <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                <div className="box-body">
                    <div className={"form-group col-md-12"}>
                        <dt>Tax Type Name</dt>
                        <input type="text" id="tax_type" className="form-control"/>
                        <input type="hidden" id="id" className="form-control"/>
                    </div>
                    <div className={"form-group col-md-12"}>
                        <dt>Value (in %)<sup>*</sup></dt>
                        <input type="text" id="value" className="form-control" />
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

export default TaxEditPage;