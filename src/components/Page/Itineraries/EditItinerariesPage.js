/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import ItinerariesForm from '../Itineraries/EditItinerariesForm';
import Breadcrum from '../../BreadcrumPage';
class EditItinerariesPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            id              : this.props.id

        };
    }
    render(){
        const { id } = this.state
        return(
                <div className="content-wrapper">
                {/* Import Breadcrup component boxes here */}
                <Breadcrum title="Edit Itinerary " titleRight={'All Itineraries'} url={'allitineraries'}/>
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <ItinerariesForm id={id}/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default EditItinerariesPage;
