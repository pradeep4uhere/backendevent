/*
 * @PageName    :: OrderDetailsPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 Sep 2019
 */
import React from 'react';
import Breadcrum from '../BreadcrumPage';
import EventBookingList from './General/EventBookingList';

class OrderDetailsPage extends React.Component{
    constructor() {
        super();
    }


    componentDidMount() {
    }

    render(){
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="Event Booking List" titleRight="Dashboard" url="/dashboard" />
            <section className="content">
            <div className="row">
            <div className="col-md-12">
                <EventBookingList/>
            </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        );
    };
}
export default OrderDetailsPage;
