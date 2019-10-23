/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import EventEditPage from '../Event/EventEditForm';
import Breadcrum from '../../BreadcrumPage';
class EditEventPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            eventId         : this.props.id,

        };
    }
    render(){
        return(
                <div className="content-wrapper">
                {/* Import Breadcrup component boxes here */}
                <Breadcrum title="Edit Event" titleRight='All Event List' url='eventlist' />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <EventEditPage id={this.props.id}/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default EditEventPage;
