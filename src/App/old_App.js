import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Navigation from '../components/Navigation';
import LeftSideBar from '../components/LeftSideBar/LeftSideBar';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import SettingPage from '../components/Page/SettingPage';
import Login from '../Login/Login';
import Logout from '../Logout';
import NotFound from '../components/NotFound';
import Register from '../Login/Register';
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
class App extends Component {
  	constructor() {
  		super();
      this.state = {
        isLoggedIn:false
      }
      localStorage.setItem('user','dasds')
      if(localStorage.getItem('user')){
        this.state = {isLoggedIn:true}
       }
    }
render() {
   const { isLoggedIn } = this.state
   if (isLoggedIn == true) {
     return (
      <div>
         <Navigation />
         <LeftSideBar/>
         <Router>
          <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/setting" component={SettingPage} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/logout" component={Logout} />
              <Route path="*" component={NotFound} />
         </Switch>
        </Router>
      </div>
    );
  } else {
    return (
      <Router>
        <Switch>
         <Route exact path="/">  
            <Redirect to="/login" />  
          </Route>  
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='*' component={Login} />
        </Switch>
      </Router>
    );
  }
  }
}
export default App;
