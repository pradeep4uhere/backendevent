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
const urlEventStr    = Constants.MEMBERSHIP_PLAN_LIST;
const urlMembershipUpdate = Constants.MEMBERSHIP_PLAN_UPDATE_URL;
const urlMembershipPriceUpdate = Constants.MEMBERSHIP_PLAN_PRICE_UPDATE_URL;
const urlTimeDelete = Constants.MEMBERSHIP_PLAN_DELETE_URL;
const token     = localStorage.getItem('token');
class MembershipListEditPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          id : this.props.id,
          membership:[],
          membership_feature:[],
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
        this.handleSubmitPrice= this.handleSubmitPrice.bind(this);
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
                membership : response.data.membership,
                membership_feature:response.data.membership.membership_feature,
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



    handleSubmitPrice(event){
        var tokenStr = token;
        event.preventDefault();
        var id                = this.state.id;
        var name              = event.target.name.value;
        var monthly_price     = event.target.monthly_price.value;
        var yearly_price      = event.target.yearly_price.value;
        var quarterly_price   = event.target.quarterly_price.value;

        var status            = event.target.status.value;
        const form            = event.currentTarget
        const body            = serialize(form, {hash: true,empty:true})
        const formData = {
            token             : tokenStr,
            id                : id,
            name              : name,
            monthly_price     : monthly_price,
            yearly_price      : yearly_price,
            quarterly_price   : quarterly_price,
            status            : status,
        }
        axios.post(urlMembershipPriceUpdate, formData)
        .then((response) => {
          if(response.data.code==200) {
                  this.setState({
                    messageP     : response.data.message,
                    classstrP    : 'alert alert-success',
                    classNameP   : 'success',
                    isMsgP       : true,
                    noRecords:false
              });
              this.getItinerariesDetails();
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
      
      handleSubmit(event){
      var tokenStr = token;
      event.preventDefault();
      var id                = event.target.id.value;;
      var membership_plan_id= event.target.membership_plan_id.value;
      var feature_title     = event.target.feature_title.value;
      var status            = event.target.status.value;
      const form = event.currentTarget
      const body = serialize(form, {hash: true,empty:true})
      const formData = {
          token             : tokenStr,
          membership_plan_id: membership_plan_id,
          feature_title     : feature_title,
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
      $('#membership_plan_id').val(obj.membership_plan_id);
      $('#feature_title').val(obj.feature_title);
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
          sAText  : 'You want to delete membership feature',
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
      const {membership_feature} = this.state;
      const { isMsg }         = this.state;
      const { classstr }      = this.state;
      const { message }       = this.state;
      const { isOverlay }     = this.state;
      const { isMsgP }         = this.state;
      const { classstrP }      = this.state;
      const { messageP }       = this.state;
      const { isOverlayP }     = this.state;
      let membershipFeatureStr = '';
      if(membership_feature.length>0){
          console.log(membership.membership_feature);
        membershipFeatureStr = membership_feature.map((key,k) =>
            <tr>
              <td width="1%">{k+1}</td>
              <td>{key.feature_title}</td>
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
            <Breadcrum title="Edit Membership Plan" titleRight='All Membership  List' url='/membership' />
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
              <i className="glyphicon glyphicon-bookmark"></i>
                <h3 className="box-title box-widget">{membership.name} Membership Feature</h3>
              </div>
              <div className="box-body no-padding">
              <table className="table table-striped" style={{'font-size':'12px'}}>
                <tbody><tr>
                  <th>#</th>
                  <th style={{'white-space':'nowrap'}}>Feature</th>
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
                <h3 className="box-title">Add/Update Membership Features</h3>
                <a href={"/membershipedit?"+this.state.id} className="pull-right btn btn-sm btn-danger"><i className="fa fa-plus"></i>&nbsp;Add New Feature</a>
              </div>
              {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
              <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                <div className="box-body">
                    <div className={"form-group col-md-12"}>
                        <dt>Membership Plan Name</dt>
                        <input type="text" id="membership_plan_name" className="form-control" value={this.state.membership.name} readOnly="readonly"/>
                        <input type="hidden" id="membership_plan_id" className="form-control" value={this.state.id} />
                    </div>
                    <div className={"form-group col-md-12"}>
                        <dt>Feature Title</dt>
                        <input type="text" id="feature_title" className="form-control" />
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
             <div className="col-md-8">
            <div className="box box-solid">
            <div className="overlay" show={isOverlay}><i className="fa fa-refresh fa-spin"></i></div>
              <div className="box-header with-border bg-warning">
              <i className="glyphicon glyphicon-bookmark"></i>
                <h3 className="box-title box-widget">{membership.name} Membership Price</h3>
              </div>
              <div className="box-body no-padding">
              <table className="table table-striped" style={{'font-size':'12px'}}>
                <tbody><tr>
                  <th>#</th>
                  <th style={{'white-space':'nowrap'}}>Name</th>
                  <th style={{'white-space':'nowrap'}}>Monthly Price</th>
                  <th style={{'white-space':'nowrap'}}>Quarterly Price</th>
                  <th style={{'white-space':'nowrap'}}>Yearly Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                <tr>
                <td width="1%">1</td>
                <td>{membership.name}</td>
                <td><i className="fa fa-inr"></i>{membership.monthly_price}</td>
                <td><i className="fa fa-inr"></i>{membership.quarterly_price}</td>
                <td><i className="fa fa-inr"></i>{membership.yearly_price}</td>
                <td>{(membership.status==1)?(<span className="badge bg-green">Active</span>):(<span className="badge bg-red">In Active</span>)}</td>
                <td>
                    <a href="#"><i className="fa fa-pencil" onClick={((e) => this.EditPrice(e, membership))}></i></a>&nbsp;&nbsp;
                </td>
                </tr>
              </tbody></table>
            </div>
            </div>
            </div>
             <div className="col-md-4">
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fa fa-pencil" />
                <h3 className="box-title">Add/Update Membership Price</h3>
                
              </div>
              {(isMsgP)?(<div className={classstrP}>{messageP}</div>):(<div></div>)}
              <form role="form" onSubmit={this.handleSubmitPrice}  id="form-event_price">
                <div className="box-body">
                    <div className={"form-group col-md-12"}>
                        <dt>Monthly Price</dt>
                        <input type="text" id="name" className="form-control" />
                    </div>
                    <div className={"form-group col-md-6"}>
                        <dt>Monthly Price</dt>
                        <input type="text" id="monthly_price" className="form-control" />
                    </div>
                    <div className={"form-group col-md-6"}>
                        <dt>Quarterly Price </dt>
                        <input type="text" id="quarterly_price" className="form-control" />
                    </div>
                    <div className={"form-group col-md-6"}>
                        <dt>Yearly Price </dt>
                        <input type="text" id="yearly_price" className="form-control"  />
                    </div>
                    <div className={"form-group col-md-6"}>
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

export default MembershipListEditPage;