/*
 * @PageName    :: MemberListPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import {Redirect } from 'react-router-dom';
import $ from 'jquery';
import Breadcrum from '../../BreadcrumPage';
import AllLatestDestinationList from '../Destination/AllLatestDestinationList';

class DestinationListPage extends React.Component{
    constructor() {
        super();
    }


    componentDidMount() {
    }

    render(){
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="Destination List" titleRight="Add Destination" url="/adddestination" />
            <section className="content">
            <div className="row">
            <div className="col-md-12">
                <AllLatestDestinationList/>
            </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        );
    };
}
export default DestinationListPage;
