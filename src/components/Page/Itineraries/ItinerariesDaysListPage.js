/*
 * @PageName    :: MemberListPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import {Redirect } from 'react-router-dom';
import $ from 'jquery';
import Breadcrum from '../../BreadcrumAddPage';
import AllItinerariesDaysList from '../Itineraries/AllItinerariesDaysList';

class ItinerariesDaysListPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id
        };
    }


    componentDidMount() {
    }

    render(){
        const { id } = this.state;
    return(
        <div className="content-wrapper">
        {/* Import Breadcrup component boxes here */}
        <Breadcrum title="All Itineraries Days List" titleRight="All Itineraries" url="/allitineraries" />
            <section className="content">
            <div className="row">
            <div className="col-md-12">
                <AllItinerariesDaysList id={id}/>
            </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        );
    };
}
export default ItinerariesDaysListPage;
