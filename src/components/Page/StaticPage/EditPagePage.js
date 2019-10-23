/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import PageEditForm from '../StaticPage/PageEditForm';
import Breadcrum from '../../BreadcrumPage';
class EditPagePage extends React.Component{
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
                <Breadcrum title="Edit Page" titleRight='All Page List' url='pagelist' />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <PageEditForm id={this.props.id}/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default EditPagePage;
