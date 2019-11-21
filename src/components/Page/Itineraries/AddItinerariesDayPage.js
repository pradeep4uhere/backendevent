/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import AddItinerariesDayForm from '../Itineraries/AddItinerariesDayForm';
import Breadcrum from '../../BreadcrumPage';
class AddItinerariesDayPage extends React.Component{
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
                <Breadcrum title="Add Travel Experience Day" titleRight={"All Travel Experience"} url={'allitineraries'}/>
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <AddItinerariesDayForm id={id}/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default AddItinerariesDayPage;
