/*
 * @PageName    :: TravelOrderInvoicePage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 11 Dec 2019
 */
import React from 'react';
import axios from 'axios'
import Breadcrum from '../BreadcrumPage';
import Constants  from '../../config/Constants';
import Moment from 'react-moment';  
import NumberFormat from 'react-number-format';
const urlStr    = Constants.GET_TRAVEL_ORDER_DETAILS_URL;
const token     = localStorage.getItem('token');
class TravelOrderInvoicePage extends React.Component{
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
                });
                console.log("dahsboardList",this.state.orderDetails);
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
       
        let orderList = "";
        let shipping_address1 = '';
        let shipping_address2 = '';
        let shipping_state    = '';
        let shipping_city     = '';
        let shipping_pincode  = '';
        let shipping_mobile   = '';
        let shipping_email    = '';
        let orderID           = '';
        let created_at        = '';
        let total_amount      = '0.00';
        let subtotal          = '0.00';
        let tax_amount        = '0.00';
        let offer_value       = '0.00';
        let user_id           = '';
        
        if(this.state.orderDetails.length){
          shipping_address1 = this.state.orderDetails[0].shipping_address1;
          shipping_address2 = this.state.orderDetails[0].shipping_address2;
          shipping_state    = this.state.orderDetails[0].shipping_state;
          shipping_city     = this.state.orderDetails[0].shipping_city;
          shipping_pincode  = this.state.orderDetails[0].shipping_pincode;
          shipping_mobile   = this.state.orderDetails[0].shipping_mobile;
          shipping_email    = this.state.orderDetails[0].shipping_email;
          orderID           = this.state.orderDetails[0].orderID;
          created_at        = this.state.orderDetails[0].created_at;
          total_amount      = this.state.orderDetails[0].total_amount;
          subtotal          = this.state.orderDetails[0].subtotal;
          tax_amount        = this.state.orderDetails[0].tax_amount;
          offer_value       = this.state.orderDetails[0].offer_value;
          user_id       = this.state.orderDetails[0].user_id;

          



          console.log("this is new ",this.state.orderDetails);  
          orderList = this.state.orderDetails.map((val,i) =>
            <tr>
                <td><img src={val.itinerary_booking[0].itinerary.image} width={50} alt={"image"}/></td>
                <td>{val.itinerary_booking[0].itinerary.title}</td>
                <td>{val.itinerary_booking[0].itinerary_departure.start_date}</td>
                <td>{priceType}{val.itinerary_booking[0].itinerary_departure.price}</td>
                <td>{priceType}{val.itinerary_booking[0].itinerary_departure.price}</td>
            </tr>
         );    
        }
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="Order Invoice" titleRight="All User's Order" url={"/userorder?"+user_id} />
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
              {shipping_address1},&nbsp;{shipping_address2}<br />
              {shipping_state},&nbsp;{shipping_city},&nbsp;{shipping_pincode}<br />
              Phone: {shipping_mobile}<br />
              Email: {shipping_email}
            </address>
          </div>
          {/* /.col */}
          <div className="col-sm-4 invoice-col">
            <b>Invoice #{orderID}</b><br />
            <br />
            <b>Order ID:</b> {orderID}<br />
            <b>Payment Date:</b><Moment format="LLL">{created_at}</Moment><br />
            <b>Account:</b> <NumberFormat value={total_amount} displayType={'text'} thousandSeparator={true} prefix={priceType} />
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
                  <th>Itinerary Name</th>
                  <th>Departure Date</th>
                  <th>Price</th>
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
                    <td><NumberFormat value={subtotal} displayType={'text'} thousandSeparator={true} prefix={priceType} /></td>
                  </tr>
                  <tr>
                    <th>Tax (9.3%)</th>
                    <td><NumberFormat value={tax_amount} displayType={'text'} thousandSeparator={true} prefix={priceType} /></td>
                  </tr>
                  <tr>
                    <th>Offer:</th>
                    <td><NumberFormat value={offer_value} displayType={'text'} thousandSeparator={true} prefix={priceType} /></td>
                  </tr>
                  <tr>
                    <th>Total:</th>
                    <td><NumberFormat value={total_amount} displayType={'text'} thousandSeparator={true}  prefix={priceType} /></td>
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
export default TravelOrderInvoicePage;
