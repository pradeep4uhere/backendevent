/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import AddDestinationForm from '../Destination/AddDestinationForm';
import Breadcrum from '../../BreadcrumPage';
class AddDestinationPage extends React.Component{
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
                <Breadcrum title="Add Destination" titleRight="All Destination" url="alldestination" />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-6">
                        <AddDestinationForm/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default AddDestinationPage;
