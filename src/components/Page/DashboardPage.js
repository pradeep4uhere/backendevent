import React from 'react';
import { Chart } from "react-google-charts";
import Breadcrum from '../BreadcrumPage';
import OrderList from '../Partials/OrderList';
import LatestMemberList from '../Partials/LatestMemberList';
import EventAddedList from '../Partials/EventAddedList';
import LatestCounterList from '../Partials/LatestCounterList';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../config/Constants'
const token     = localStorage.getItem('token');
const urlDashboardDataUrl = Constants.DASHBOARD_DATA;
const pieOptions = {
  is3D: true,
  priceType:'INR',
  title: "",
  pieHole: 0.6,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};
class DashboardPage extends React.Component{
    constructor() {
        super();
        this.state = {
          chartImageURI: "",
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
      const {TotalAmount} = this.state;
      const { priceType } = this.state;
    return(
      <div className="content-wrapper">
      {/* Import Breadcrup component boxes here */}
      <Breadcrum title="Dashboard" titleRight="Dashboard"/>
      

        <section className="content">
          {/* Info boxes */}
         
          <div className="row">
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-aqua">
            <div className="inner">
              <h3>{this.state.dahsboardList.Count}</h3>
              <p style={{"color":"#FFF"}}>Total Event Booking</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <a href={"/allbooking"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-green">
            <div className="inner">
              <h3>{priceType}{this.state.dahsboardList.TotalAmount}</h3>
              <p style={{"color":"#FFF"}}>Event Order Payment</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <a href={"/allbooking"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-yellow">
            <div className="inner">
              <h3>{this.state.dahsboardList.Users}</h3>
              <p style={{"color":"#FFF"}}>User Registrations</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <a href={"/memberlist"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-red">
            <div className="inner">
              <h3>{this.state.dahsboardList.Enquiry}</h3>
              <p style={{"color":"#FFF"}}>Contact Us Enquiry</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <a href="#" className="small-box-footer">&nbsp;</a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-yellow">
            <div className="inner">
              <h3>{this.state.dahsboardList.Users}</h3>
              <p style={{"color":"#FFF"}}>Travel Booking Order</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <a href={"/memberlist"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-aqua">
            <div className="inner">
              <h3>{priceType}{this.state.dahsboardList.TotalAmount}</h3>
              <p style={{"color":"#FFF"}}>Travel Order Payment</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <a href={"/allbooking"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
      </div>
      <div className="row">
      <div className="col-md-6">

      {/* PRODUCT LIST */}
      <div className="box box-primary">
      <div className="box-header with-border">
      <h3 className="box-title">Events Booking Report</h3>
      <Chart
          chartType="PieChart"
          data={[["Type","Value"], ["New", 5], ["Booked", 25], ["Payment Sccuess", 52], ["Cancel",  52]]}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />
        </div></div></div>
        <div className="col-md-6">

        {/* PRODUCT LIST */}
        <div className="box box-primary">
        <div className="box-header with-border">
        <h3 className="box-title">User Report</h3>

        <Chart
            width={'790px'}
            height={'350px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
              ['Month', 'Register','Booking'],
              ['Jan',   1000,     200],
              ['Feb',   200,      150],
              ['Mar',   150,      100],
              ['Apr',   230,      200],
              ['May',   542,      200],
              ['Jun',   254,      284],
              ['Jul',   805,      652],
              ['Aug',   1030,     254],
              ['Sept',  1030,     215],
              ['Oct',   0,        0],
              ['Nov',   0,        0],
              ['Dec',   0,        0],
            ]}
            options={{
              chartArea: { width: '50%' },
              // Material design options
              chart: {
                title: 'Customer Registration Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
              },
            }}
            // For tests
            rootProps={{ 'data-testid': '2' }}
          />
          </div></div></div></div>

          {/* Import All Latest Event Booking Order List*/}
          <OrderList/>
          

          <div className="row">
            
            {/* Import All Latest Member List*/}
            <LatestMemberList/>

            {/* Import All Latest Event Added*/}
            <EventAddedList/>

          </div>
        </section>
        {/* /.content */}
      </div>
        );
    };
}
export default DashboardPage;
