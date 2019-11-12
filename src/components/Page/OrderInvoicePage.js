/*
 * @PageName    :: OrderDetailsPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 Sep 2019
 */
import React from 'react';
import axios from 'axios'
import Breadcrum from '../BreadcrumPage';
import Constants  from '../../config/Constants';
import Moment from 'react-moment';  
import NumberFormat from 'react-number-format';
const urlStr    = Constants.GET_USER_ORDER_DETAILS_URL;
const token     = localStorage.getItem('token');
class OrderInvoicePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventList   : [],
            userList    : {},
            isMsg       : false,
            className   : '',
            show        : false,
            orderDetails: [],
            titleRudra  : "",
            settings    : {},
            phoneNumber : "",
            phoneNumber2 : "",
            email       : "",
            address     : "",
            company     : "",
            userList    : {},
            priceType   : 'INR'    
        }
        
        this.getEventOrderList       = this.getEventOrderList.bind(this);
    }


    /******Get all the user list here********/   
    getEventOrderList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            id       : this.props.id,
            order_id : this.props.id,
        }
        axios.post(urlStr, formData)
        .then((response) => {
           
          if(response.data.data.code==200) {
            // console.log("dahsboardList",response.data.data.orderDetails);
                this.setState({
                    orderDetails    :   response.data.data.orderDetails,
                    settings        :   response.data.data.settings,
                    priceType       :   response.data.data.settings[14]['options_value'],
                    titleRudra      :   response.data.data.settings[8]['options_value'],
                    phoneNumber     :   response.data.data.settings[2]['options_value'],
                    phoneNumber2    :   response.data.data.settings[3]['options_value'],
                    email           :   response.data.data.settings[1]['options_value'],
                    address         :   response.data.data.settings[16]['options_value'],
                    company         :   response.data.data.settings[17]['options_value'],
                    priceType       :   response.data.data.settings[14]['options_value'],
                    userList        :   response.data.data.User,
                    eventList       :   response.data.data.orderDetails.temp_seat_booking,
                });
                console.log("dahsboardList",this.state.eventList);
          }
          else
          {
            
          }
        })
        .catch((err) => {
            
        })
    }

    componentDidMount() {
        this.getEventOrderList();
    }

    render(){
        const {titleRudra}  =  this.state;
        const {phoneNumber} =  this.state;
        const {phoneNumber2}=  this.state;
        const {email}       =  this.state;
        const {address}     =  this.state;
        const {company}     =  this.state;
        const {userList}    =  this.state;
        const {orderDetails}=  this.state;
        const {priceType}   =  this.state;
        const {eventList}   =  this.state;
        console.log("this is new ",this.state.eventList);  
        let orderList = "";
        if(this.state.eventList){
          console.log("this is new ",this.state.eventList);  
          orderList = this.state.eventList.map((val,i) =>
              <tr>
                  <td><img src={(("EventImage" in val))?val.EventImage.src:''} width={"50"} alt="Image"/></td>
                  <td>{(("Event" in val))?val.Event.title:''}</td>
                  <td>{(("Event" in val))?val.Seat.length:''}</td>
                  <td>{priceType}{val.event_seat.Price}</td>
                  <td>{val.event_seat.SeatType}</td>
                  <td>{
                      val.Seat.length ? val.Seat.map((itemTestArray) =>
                      (<span className="badge bg-green" style={{"margin":"1px"}}> {itemTestArray}</span>)) : '-'
                      }
                  </td>
                  <td>{priceType}{val.Seat.length * val.event_seat.Price}</td>
            </tr>
          );    
        }
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="Order Invoice" titleRight="All User's Order" url={"/userorder?"+orderDetails.user_id} />
        <div className="pad margin no-print">
        <div className="callout callout-info" style={{marginBottom: '0!important'}}>
          <h4 ><i className="fa fa-info" /> Note:</h4>
          This page has been enhanced for printing. Click the print button at the bottom of the invoice.
        </div>
      </div>
        <section>
            <div className="row">
            <div className="col-md-12">
            <section className="invoice">
        {/* title row */}
        <div className="row">
          <div className="col-xs-12">
            <h2 className="page-header">
              <i className="fa fa-globe" /> {company}
              <small className="pull-right">Date: <Moment format="LL">{orderDetails.created_at}</Moment></small>
            </h2>
          </div>
          {/* /.col */}
        </div>
        {/* info row */}
        <div className="row invoice-info">
          <div className="col-sm-4 invoice-col">
            From
            <address>
              <strong>{company}</strong><br />
              {address}<br />
              Phone: {phoneNumber},{phoneNumber2}<br />
              Email: {email}
            </address>
          </div>
          {/* /.col */}
          <div className="col-sm-4 invoice-col">
            To
            <address>
              <strong>{userList.first_name}&nbsp;{userList.last_name}</strong><br />
              {orderDetails.shipping_address1},&nbsp;{orderDetails.shipping_address2}<br />
              {orderDetails.shipping_state},&nbsp;{orderDetails.shipping_city},&nbsp;{orderDetails.shipping_pincode}<br />
              Phone: {orderDetails.shipping_mobile}<br />
              Email: {orderDetails.shipping_email}
            </address>
          </div>
          {/* /.col */}
          <div className="col-sm-4 invoice-col">
            <b>Invoice #{orderDetails.orderID}</b><br />
            <br />
            <b>Order ID:</b> {orderDetails.orderID}<br />
            <b>Payment Date:</b><Moment format="LLL">{orderDetails.created_at}</Moment><br />
            <b>Account:</b> <NumberFormat value={orderDetails.total_amount} displayType={'text'} thousandSeparator={true} prefix={priceType} />
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
        {/* Table row */}
        <div className="row">
          <div className="col-xs-12 table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Event</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Seat Type</th>
                  <th>Seat No</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
               {orderList}
              </tbody>
            </table>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
        <div className="row">
          {/* accepted payments column */}
          <div className="col-xs-6">
            <p className="lead">Payment Methods:</p>
            <img src="../theme/dist/img/credit/visa.png" alt="Visa" />
            <img src="../theme/dist/img/credit/mastercard.png" alt="Mastercard" />
            <img src="../theme/dist/img/credit/american-express.png" alt="American Express" />
            <img src="../theme/dist/img/credit/paypal2.png" alt="Paypal" />
            <p className="text-muted well well-sm no-shadow" style={{marginTop: '10px'}}>
              Your Payment Details goes here !!
            </p>
          </div>
          {/* /.col */}
          <div className="col-xs-6">
            <p className="lead"><b>Payment Date:</b>&nbsp;&nbsp;<Moment format="LL">{orderDetails.created_at}</Moment></p>
            <div className="table-responsive">
              <table className="table">
                <tbody><tr>
                    <th style={{width: '50%'}}>Subtotal:</th>
                    <td><NumberFormat value={orderDetails.subtotal} displayType={'text'} thousandSeparator={true} prefix={priceType} /></td>
                  </tr>
                  <tr>
                    <th>Tax (9.3%)</th>
                    <td><NumberFormat value={orderDetails.tax_amount} displayType={'text'} thousandSeparator={true} prefix={priceType} /></td>
                  </tr>
                  <tr>
                    <th>Offer:</th>
                    <td><NumberFormat value={orderDetails.offer_value} displayType={'text'} thousandSeparator={true} prefix={priceType} /></td>
                  </tr>
                  <tr>
                    <th>Total:</th>
                    <td><NumberFormat value={orderDetails.total_amount} displayType={'text'} thousandSeparator={true}  prefix={priceType} /></td>
                  </tr>
                </tbody></table>
            </div>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
        {/* this row will not appear when printing */}
        <div className="row no-print">
          <div className="col-xs-12">
            <a href="invoice-print.html" target="_blank" className="btn btn-default"><i className="fa fa-print" /> Print</a>
            <button type="button" className="btn btn-success pull-right"><i className="fa fa-credit-card" /> Submit Payment
            </button>
            <button type="button" className="btn btn-primary pull-right" style={{marginRight: '5px'}}>
              <i className="fa fa-download" /> Generate PDF
            </button>
          </div>
        </div>
      </section>
            </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        );
    };
}
export default OrderInvoicePage;
