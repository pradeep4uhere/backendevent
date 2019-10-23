/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import AddTheatreSeatForm from '../Theatre/AddTheatreSeatForm';
import Breadcrum from '../../BreadcrumPage';
class AddTheatreSeatPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            theatre_id      : this.props.theatre_id

        };
        //console.log("inside====".props.history.location.search);
    }
    render(){
        const { theatre_id } = this.state;
        return(
                <div className="content-wrapper">
                <Breadcrum title="Add Seats"  titleRight='All Theatre List' url='alltheatre' />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <AddTheatreSeatForm theatre_id={theatre_id}/>
                    </div>
                    </div>
                    </section>
                </div>
           );
    };
}
export default AddTheatreSeatPage;
