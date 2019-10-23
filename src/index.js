import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Switch } from 'react-router-dom'
import { BrowserRouter,Route,Redirect,withRouter, } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import Navigation from './components/Navigation';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import SettingPage from './components/Page/SettingPage';
import Login from './Login/Login';
import Register from './Login/Register';
import App from './App/App';
import $ from 'jquery';

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )

// const HomePage = () => (<span>Home</span>);
// const Work = () => (<span>Work</span>);
// const Blog = () => (<span>Blog</span>);
// const DashboardPage = () => (<Dashboard/>);
// const GeneralSetting = () => (<SettingPage/>);

// const BaseLayout = () => (
// <div>
//   <Navigation/>
//   <LeftSideBar/>
//   <Route path="/dashboard" exact component={DashboardPage} />
//   <Route path="/setting" component={GeneralSetting} />
//   <Route path="/blog" component={Blog} />
//   <Footer/>
// </div>
// )

// const DefaultLayout = () => (
// <div>
//   <Route path="/" exact component={Login} />
// </div>
// )

// const App = () => (
//   <BrowserRouter>
//   <BaseLayout />
//   </BrowserRouter>
// )

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
