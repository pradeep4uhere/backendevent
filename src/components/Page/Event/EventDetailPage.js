/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import {browserHistory} from 'react-router';
import Constants  from '../../../config/Constants'
import $ from 'jquery';
import EventDetailTab from '../Event/EventDetailTab';
import Breadcrum from '../../BreadcrumPage';
class EventDetailPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : ''

        };
    }
    render(){
        return(
                <div className="content-wrapper">
                {/* Import Breadcrup component boxes here */}
                <Breadcrum title="Event Detail" titleRight="Event List" url="/eventlist"/>
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <EventDetailTab/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default EventDetailPage;
