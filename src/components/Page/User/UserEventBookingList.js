/*
 * @PageName    :: UserEventBookingList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 25 Sept 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import Moment from 'react-moment';  
const urlUserOrderList      = Constants.USER_EVENT_ORDER_LSIT_URL;
const token     = localStorage.getItem('token');
class UserEventBookingList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dahsboardList  : [],
            id:this.props.id,
            priceType:'INR'
            
        }
        this.getEventOrderList       = this.getEventOrderList.bind(this);
 
    }


    /******Get all the user list here********/   
    getEventOrderList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            id       : this.props.id,
            order_id : ''
        }
        axios.post(urlUserOrderList, formData)
        .then((response) => {
          if(response.data.data.code==200) {
                this.setState({
                    dahsboardList:response.data.data.orderList,
                    userList:response.data.user,
                    priceType:response.data.settings[14]['options_value']
                });
                //console.log("dahsboardList",this.state.dahsboardList);
          }
          else
          {
            
          }
        })
        .catch((err) => {
            
        })
    }
    

    componentDidMount(){
       this.getEventOrderList();
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
        const { priceType } =  this.state;
        console.log(dahsboardList.data);
        let orderList = "";
        if(this.state.dahsboardList.data){
          console.log("this is new ",this.state.dahsboardList.data);  
           orderList = this.state.dahsboardList.data.map((val,i) =>
                <tr>
                    <td><a href={"orderinvoice?"+val.orderID}>{val.orderID}</a></td>
                    <td><Moment format="LLL">{val.order_date}</Moment></td>
                    <td>{val.shipping_fname}&nbsp;{val.shipping_lname}</td>
                    <td>{val.email_address}</td>
                    <td>{val.shipping_mobile}</td>
                    <td><span className="label label-success">{val.order_status.status_type}</span></td>
                    <td><div className="sparkbar" data-color="#00a65a" data-height={20}>{priceType}{val.total_amount}</div></td>
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
                <h3 className="box-title">Latest Event Booking Orders </h3>
                <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                <table id="example1" class="table table-bordered table-striped">
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
                </table>
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
export default UserEventBookingList;
