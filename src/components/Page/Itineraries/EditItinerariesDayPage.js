/*
 * @PageName    :: EditItinerariesDayPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import EditItinerariesDayForm from '../Itineraries/EditItinerariesDayForm';
import Breadcrum from '../../BreadcrumPage';
class EditItinerariesDayPage extends React.Component{
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
                   <Breadcrum title="Edit Itinerary Day" titleRight={'All Itineraries Days'} url={'allitineraries'}/>
                    <section className="content">
                    <div className="row">
                     <div className="col-md-12">
                        <EditItinerariesDayForm id={id}/>
                     </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default EditItinerariesDayPage;
