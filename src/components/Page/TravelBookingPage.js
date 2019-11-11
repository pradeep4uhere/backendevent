/*
 * @PageName    :: MemberListPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import Breadcrum from '../BreadcrumPage';
import TravelBookingList from './General/TravelBookingList';

class TravelBookingPage extends React.Component{
    constructor() {
        super();
    }


    componentDidMount() {
    }

    render(){
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="Travel Booking List" titleRight="Dashboard" url="/dashboard" />
            <section className="content">
            <div className="row">
            <div className="col-md-12">
                <TravelBookingList/>
            </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        );
    };
}
export default TravelBookingPage;
