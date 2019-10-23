/*
 * @PageName    :: OrderDetailsPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 Sep 2019
 */
import React from 'react';
import Breadcrum from '../BreadcrumPage';
import UserEventBookingList from './User/UserEventBookingList';

class UserOrderDetailsPage extends React.Component{
    constructor(props) {
        super(props);
    }


    componentDidMount() {
    }

    render(){
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="All Event Booking List" titleRight="All User List" url="/memberlist" />
            <section className="content">
            <div className="row">
            <div className="col-md-12">
                <UserEventBookingList id={this.props.id}/>
            </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        );
    };
}
export default UserOrderDetailsPage;
