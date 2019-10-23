/*
 * @PageName    :: UserViewPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for user details
 * @params      :: Props as user object directly getting from the parnet component
 * @Created Date:: 09 May 2019
 */
import React from 'react';
class UserViewPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userDetails     : this.props.user
        };
        this.capitalize     = this.capitalize.bind(this);

    }



    capitalize(str) {
        var strVal = '';
        str = str.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
          strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
    }

    
    render(){
        const { userDetails } = this.state;
        return(
            <div class="panel panel-primary">
            <div class="panel-heading">User Details</div>
                <div className="box-body">
                <strong>Name</strong>
                <p className="text-muted">
                    {this.capitalize(userDetails.first_name)}&nbsp;{this.capitalize(userDetails.last_name)}
                </p>
                <hr />
                <strong>Username</strong>
                <p className="text-muted">
                    {this.capitalize(userDetails.username)}
                </p>
                
                <hr />
                <strong>Email Address</strong>
                <p className="text-muted">
                    {userDetails.email}
                </p>
                <hr />
                <strong><i className="fa fa-map-marker margin-r-5" /> Address</strong>
                <p className="text-muted">-NA-</p>
                <hr />
                <strong>Status</strong>
                <p className="text-muted">
                {(userDetails.status==1)?(<span className='label label-success'>Active</span>):(<span className='label label-danger'>In Active</span>)}
                </p>
                <hr />
                <strong>Created On</strong>
                <p className="text-muted">
                    {userDetails.created_at}
                </p>
                </div>
        </div>
      );
    };
}
export default UserViewPage;
