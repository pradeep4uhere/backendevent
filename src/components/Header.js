import React from 'react';
import Logo from '../theme/rudra/images/rudra-logo.png';
import User from '../theme/rudra/images/ico_user.png';
import Cart from '../theme/rudra/images/ico_cart.png';
import Search from '../theme/rudra/images/ico_search.png';
import Nav from '../theme/rudra/images/icon_nav.png';
class Header extends React.Component{
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
                <a className="nav-link" href="#"><img src={User} width={22} height={22} alt /></a>&nbsp;&nbsp;
                <a className="nav-link" href="#"><img src={Cart} width={29} height={27} alt /></a>&nbsp;&nbsp;
                <a className="nav-link" href="#"> <img src={Search} width={27} height={27} alt /></a>&nbsp;&nbsp;
                <input type="button" className="btn btn-danger bookNow" defaultValue="Book Now" />&nbsp;&nbsp;&nbsp;
                <a className="nav-link disabled" href="#"><img src={Nav} width={33} height={21} alt /></a>
              </div>
          </nav>
      );
    };
}
export default Header;
