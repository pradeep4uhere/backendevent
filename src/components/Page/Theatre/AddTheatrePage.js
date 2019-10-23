/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import AddTheatreForm from '../Theatre/AddTheatreForm';
import Breadcrum from '../../BreadcrumPage';
class AddTheatrePage extends React.Component{
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
                <Breadcrum title="Add Theatre" titleRight='All Theatre List' url='alltheatre' />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <AddTheatreForm/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default AddTheatrePage;
