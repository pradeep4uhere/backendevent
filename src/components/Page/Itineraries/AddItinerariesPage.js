/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import ItinerariesForm from '../Itineraries/ItinerariesForm';
import Breadcrum from '../../BreadcrumPage';
class AddItinerariesPage extends React.Component{
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
                <Breadcrum title="Add New Itinerary " />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <ItinerariesForm/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default AddItinerariesPage;
