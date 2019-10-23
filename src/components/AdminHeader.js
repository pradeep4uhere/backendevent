import React from 'react';
import Logo from '../theme/rudra/images/rudra-logo.png';
import User from '../theme/rudra/images/ico_user.png';
import Cart from '../theme/rudra/images/ico_cart.png';
import Search from '../theme/rudra/images/ico_search.png';
import Nav from '../theme/rudra/images/icon_nav.png';
class AdminHeader extends React.Component{
    constructor() {
        super();
        this.state = {
            clicked: false,
        };
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
              <a className="navbar-brand" href="#"><img className="logo-width" src={Logo} alt /></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon" /> </button>
              <div className="navbar-nav ml-auto">
              <ul class="nav navbar-nav navbar-right">
                <li><a href="#"><span class="glyphicon glyphicon-user"></span> Welcome, Pradeep</a></li>
               <li><a href="logout"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
              </ul>
              </div>
          </nav>
      );
    };
}
export default AdminHeader;
