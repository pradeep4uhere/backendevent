import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../config/Constants'
import Moment from 'react-moment';  
const dateToFormat = '1976-04-19T12:59-0500';
const token     = localStorage.getItem('token');
const urlDashboardDataUrl = Constants.DASHBOARD_DATA;
const appName = Constants.APP_NAME
const appTag = Constants.APP_TAG
class OrderList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          priceType: 'INR',
          dahsboardList  : [
            
          ]
      };
        this.getDetails    = this.getDetails.bind(this);
    }

    getDetails(){
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
        }
        axios.post(urlDashboardDataUrl, formData)
        .then((response) => {
          if(response.data.code==200) {
               
                this.setState({
                  dahsboardList:response.data.order,
                  priceType:response.data.order.Settings[14]['options_value'],
                });
                
          }else{
  
          }
        })
        .catch((err) => {
            
        })
      }
  
  
      componentDidMount(){
        this.getDetails();
      }


    render(){
        const {dahsboardList } =  this.state;
        const { priceType } = this.state;
        let orderList = "";
        if(this.state.dahsboardList.orderList){
          console.log("this is new ",this.state.dahsboardList.orderList);  
           orderList = this.state.dahsboardList.orderList.map((val,i) =>
                <tr>
                    <td><a href="pages/examples/invoice.html">{val.orderID}</a></td>
                    <td><Moment format="DD-MMM-YYYY">{val.order_date}</Moment></td>
                    <td>{val.shipping_fname}&nbsp;{val.shipping_lname}</td>
                    <td>{val.email_address}</td>
                    <td>{val.shipping_mobile}</td>
                    <td><span className="label label-success">{val.order_status.status_type}</span></td>
                    <td><div className="sparkbar" data-color="#00a65a" data-height={20}>{priceType}{val.total_amount}</div></td>
                </tr>
         );    
        }

        
      
        return(
                <div className="row">
                {/* Left col */}
                <div className="col-md-12">
                {/* TABLE: LATEST ORDERS */}
                <div className="box box-info">
                <div className="box-header with-border">
                <h3 className="box-title">Latest Event Booking Orders</h3>
                <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                <table id="example1" class="table table-bordered table-striped" style={{"font-size":"12px"}}>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        {orderList}
                
                    </tbody>
                </table>
                </div>
                {/* /.table-responsive */}
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix">
                {/* <a href="javascript:void(0)" className="btn btn-sm btn-info btn-flat pull-left">Place New Order</a> */}
                <a href={"/allbooking"} className="btn btn-sm btn-info btn-flat pull-right">View All Orders</a>
                </div>
                {/* /.box-footer */}
                </div>
                {/* /.box */}


                </div>
                {/* /.col */}

                </div>
      );
    };
}
export default OrderList;
