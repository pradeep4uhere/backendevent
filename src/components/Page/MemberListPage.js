/*
 * @PageName    :: MemberListPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import {Redirect } from 'react-router-dom';
import $ from 'jquery';
import Breadcrum from '../BreadcrumPage';
import LatestUserList from '../Partials/LatestUserList';

class MemberListPage extends React.Component{
    constructor() {
        super();
    }


    componentDidMount() {
    }

    render(){
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="Member List" titleRight="Dashboard" url="/dashboard"/>
  
          <section className="content">
            <div className="row">
            <div className="col-md-12">
                <LatestUserList/>
            </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        );
    };
}
export default MemberListPage;
