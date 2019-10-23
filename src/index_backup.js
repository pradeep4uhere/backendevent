import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link } from 'react-router-dom'
import { BrowserRouter,Route,Redirect,withRouter, } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import Navigation from './App';
import LeftSideBar from './components/LeftSideBar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

import './theme/bower_components/bootstrap/dist/css/bootstrap.min.css';
import './theme/bower_components/font-awesome/css/font-awesome.min.css';
import './theme/bower_components/Ionicons/css/ionicons.min.css';
import './theme/bower_components/jvectormap/jquery-jvectormap.css';
import './theme/dist/css/AdminLTE.min.css';
import './theme/dist/css/skins/_all-skins.min.css';
import './theme/dist/css/family.css';
// import $ from 'jquery';
import $ from 'jquery'
const DefaultLayout = ({ children }) => (                       
  <div>
    <p>Main layout</p>
    {children}                                          
  </div>           
);  

const AltLayout = ({ children }) => (                       
  <div>
    <p>Alternate layout</p>
    {children}                                          
  </div>           
);  

const HomePage = () => (<span>Home</span>);
const Work = () => (<span>Work</span>);
const Blog = () => (<span>Blog</span>);



const BaseLayout = () => (
<div class="hold-transition skin-blue sidebar-mini">
  <Navigation/>
  <LeftSideBar/>
  <Dashboard/>
  <Footer/>
  <Route path="/" exact component={HomePage} />
  <Route path="/work" component={Work} />
  <Route path="/blog" component={Blog} />
</div>
)

const App = () => (
  <BrowserRouter>
    <BaseLayout />
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
