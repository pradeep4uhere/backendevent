import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../config/Constants'
const token     = localStorage.getItem('token');
const urlDashboardDataUrl = Constants.DASHBOARD_DATA;
const appName = Constants.APP_NAME
const appTag = Constants.APP_TAG
class EventAddedList extends React.Component{
  constructor() {
    super();
    this.state = {
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
            dahsboardList:response.data.order
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
        let eventList = "";
        if(this.state.dahsboardList.EventList){
          console.log("this is new ",this.state.dahsboardList.EventList);  
           eventList = this.state.dahsboardList.EventList.map((val,i) =>
                    <li className="item">
                    <div className="product-img">
                      <img src={val.image} alt="Image" />
                    </div>
                    <div className="product-info">
                      <a href="javascript:void(0)" className="product-title">{val.title}
                        <span className="label label-info pull-right">{val.place}</span></a>
                      <span className="product-description">
                       Price: {val.price}, Durration: {val.durration} 
                      </span>
                    </div>
                  </li>
         );    
        }
        return(
            <div className="col-md-6">

              {/* PRODUCT LIST */}
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Recently Added Events</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
              </div>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <ul className="products-list product-list-in-box">
                {eventList}
                {/* /.item */}
              </ul>
            </div>
            {/* /.box-body */}
            <div className="box-footer text-center">
              <a href={"/eventlist"} className="uppercase">View All Event</a>
            </div>
            {/* /.box-footer */}
          </div>
          {/* /.box */}
          </div>

        
            );
    };
}
export default EventAddedList;
