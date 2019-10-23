/*
 * @PageName    :: SittingTypePage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for manage for all sitting type
 * @Created Date:: 28 May 2019
 */
import React from 'react';
import EventForm from '../Event/EventForm';
import Breadcrum from '../../BreadcrumPage';
class SittingTypePage extends React.Component{
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
                <Breadcrum title="Add New Event " />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <EventForm/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default SittingTypePage;
