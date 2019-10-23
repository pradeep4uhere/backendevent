/*
 * @PageName    :: MemberListPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import Breadcrum from '../BreadcrumPage';
import MembershipList from './General/MembershipList';

class MembershipListPage extends React.Component{
    constructor() {
        super();
    }


    componentDidMount() {
    }

    render(){
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="Membership List" titleRight="Dashboard" url="/dashboard" />
            <section className="content">
            <div className="row">
            <div className="col-md-12">
                <MembershipList/>
            </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        );
    };
}
export default MembershipListPage;
