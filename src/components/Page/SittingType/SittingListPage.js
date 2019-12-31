/*
 * @PageName    :: SittingTypePage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for manage for all sitting type
 * @Created Date:: 28 May 2019
 */
import React from 'react';
import SittingList from '../SittingType/SittingList';
import Breadcrum from '../../BreadcrumPage';
class SittingListPage extends React.Component{
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
                <Breadcrum title="Seating List" titleRight="Add Seating" url="/sittingtype" />
                    <section className="content  col-md-6">
                    <div className="row">
                    <div className="col-md-12">
                        <SittingList/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default SittingListPage;
