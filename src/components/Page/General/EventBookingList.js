/*
 * @PageName    :: EventBookingList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import $ from 'jquery';
import Moment from 'react-moment';  
import Setting from '../../../json/Setting.json'
import { MDBDataTable } from 'mdbreact';

const urlDashboardDataUrl = Constants.DASHBOARD_DATA;
const token     = localStorage.getItem('token');
class EventBookingList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dahsboardList  : [],
            dataTable   : [],
            
        }
        this.getEventList       = this.getEventList.bind(this);
 
    }


    /******Get all the user list here********/   
    getEventList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
        }
        axios.post(urlDashboardDataUrl, formData)
        .then((response) => {
          if(response.data.code==200) {
                this.setState({
                    dahsboardList:response.data.order,
                    dataTable   : response.data.order.dataTable,
                });
                 /************datatable Strat*************/
                 this.state.dataTable.rows.map((val,i) =>{
                    
                    var dataStr = <a href={"orderinvoice?"+val.orderID}>{val.orderID}</a>;
                    this.state.dataTable.rows[i].orderID = dataStr;

                    var statusOfferStr = (val.is_offer_applied==1)?(<span className='badge bg-green' title="Active Itinerary" >Yes</span>):(<span className='badge bg-red' title="InActive Itinerary">No</span>)
                    this.state.dataTable.rows[i].is_offer_applied = statusOfferStr;

                    var statusStr = (val.order_status==="SUCCESS")?(<span className='badge bg-green' title="Active Itinerary" >{val.order_status}</span>):(<span className='badge bg-red' title="InActive Itinerary">{val.order_status}</span>)
                    this.state.dataTable.rows[i].order_status = statusStr;
                    
                    this.setState({dataTable:this.state.dataTable});
                });
                /************datatable Ends*************/
          }
          else
          {
            
          }
        })
        .catch((err) => {
            
        })
    }
    

    componentDidMount(){
       this.getEventList();
    }

    capitalize(str) {
        var strVal = '';
        str = str.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
          strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
    }


    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }


    render(){
        const {dahsboardList } =  this.state;
        const { dataTable } = this.state;
        let orderList = "";
        if(this.state.dahsboardList.orderList){
          console.log("this is new ",this.state.dahsboardList.orderList);  
           orderList = this.state.dahsboardList.orderList.map((val,i) =>
                <tr>
                    <td><a href={"orderinvoice?"+val.orderID}>{val.orderID}</a></td>
                    <td><Moment format="LLL">{val.order_date}</Moment></td>
                    <td>{val.shipping_fname}&nbsp;{val.shipping_lname}</td>
                    <td>{val.email_address}</td>
                    <td>{val.shipping_mobile}</td>
                    <td><span className="label label-success">{val.order_status.status_type}</span></td>
                    <td><div className="sparkbar" data-color="#00a65a" data-height={20}>INR  {val.total_amount}</div></td>
                    <td><Moment format="DD-MMM-YYYY">{val.created_at}</Moment></td>
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
                <MDBDataTable
                striped
                bordered
                hover
                data={dataTable}
                exportToCSV={true}
                />
                {/* <table id="example1" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th>Created Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {orderList}
                    
                    </tbody>
                </table> */}
                </div>
                {/* /.table-responsive */}
                </div>
                {/* /.box-body */}
                {/* <div className="box-footer clearfix">
                <a href="javascript:void(0)" className="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
                <a href="javascript:void(0)" className="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
                </div> */}
                {/* /.box-footer */}
                </div>
                {/* /.box */}


                </div>
                {/* /.col */}

                </div>
          );
    };
}
export default EventBookingList;
