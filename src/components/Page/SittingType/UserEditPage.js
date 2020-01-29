/*
 * @PageName    :: SittingTypePage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for manage for all sitting type
 * @Created Date:: 28 May 2019
 */
import React from 'react';
import UserEditPageForm from '../SittingType/UserEditPageForm';
import Breadcrum from '../../BreadcrumPage';
class UserEditPage extends React.Component{
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
        const {id} = this.state.id;
        return(
                <div className="content-wrapper">
                {/* Import Breadcrup component boxes here */}
                <Breadcrum title="Update User Type" titleRight="All User List" url="latestlist" />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <UserEditPageForm id={this.props.id}/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default UserEditPage;
