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
class LatestMemberList extends React.Component{
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
       let userList = "";
       if(this.state.dahsboardList.UsersList){
        console.log("this is new ",this.state.dahsboardList.UsersList);  
         userList = this.state.dahsboardList.UsersList.map((val,i) =>
              <li>
              <img src="theme/dist/img/avatar5.png" alt="User Image" />
              <a className="users-list-name" href="#">{val.username}</a>
              <span className="users-list-date"><Moment format="DD-MMM-YYYY">{val.created_at}</Moment></span>
            </li>
       );    
      }
        return(
            <div className="col-md-6">
            <div className="box box-danger">
              <div className="box-header with-border">
                <h3 className="box-title">Latest Members</h3>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                  </button>
                  <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" />
                  </button>
                </div>
              </div>
              {/* /.box-header */}
              <div className="box-body no-padding">
                <ul className="users-list clearfix">
                  {userList}
                </ul>
                {/* /.users-list */}
              </div>
              {/* /.box-body */}
              <div className="box-footer text-center">
                <a href={"/memberlist"} className="uppercase">View All Users</a>
              </div>
              {/* /.box-footer */}
            </div>
            {/*/.box */}
          </div>
      );
    };
}
export default LatestMemberList;
