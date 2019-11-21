/*
 * @PageName    :: LeftsideBar.js
 * @Author      :: Pradeep Kumar
 * @Description :: Left Menu of the profile
 * @Created Date:: 20 Oct 2018
 */
import React from 'react';
import Constants  from '../../config/Constants'
import {Link } from "react-router-dom";
import {$,jQuery} from 'jquery';
const userProfileImg = Constants.IMG.USER_PROFILE
class LeftSideBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        };
        
       this.getUrlParams = this.getUrlParams.bind(this);
        
    }

    getUrlVars(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    getUrlParams(str){
      var string = document.location.toString() ;
      var res = string.split("/");
      var res = (res.indexOf(str) > -1);
      return res;
    }


    getUrlParamss(str){
      var string = document.location.toString() ;
      var res = string.split("/");
      var res = (res.indexOf(str) > -1);
      if(!res){
        if(str=='orderinvoice' || str=='eorderinvoice'){
          var string = document.location.toString() ;
          var res = string.split("/");
          this.getUrlParamsWithParams(res[res.length-1]);
        }else{
          return false;    
        }
      }
      return res;
    }


    getUrlParamsWithParams(str){
      var string = document.location.toString() ;
      var res = string.split("?");
      var res = (res.indexOf(str) > -1);
      return res;
    }

    componentDidMount() {
      
    }

    render(){
        return(
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img src={userProfileImg} className="img-circle" alt="User" />
            </div>
            <div className="pull-left info">
              <p>Welcome, Admin</p>
              <a href="#"><i className="fa fa-circle text-success"></i>Online</a>
            </div>
          </div>
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN NAVIGATION</li>
            <li>
              <a href="/dashboard">
                <i className="fa fa-dashboard" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className={(((this.getUrlParams('allbooking') || this.getUrlParams('allebooking') || this.getUrlParams('orderinvoice') || this.getUrlParams('eorderinvoice')))?("treeview active menu-open"):"treeview")}>
              <a href="#">
                <i className="glyphicon glyphicon-globe" />
                <span>Booking</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li className={((this.getUrlParams('allbooking') || this.getUrlParams('orderinvoice'))?("active"):"")}><a href={"/allbooking"} ><i className="fa fa-list" />Event Booking</a></li>
                <li className={((this.getUrlParams('allebooking') || this.getUrlParams('eorderinvoice'))?("active"):"")}><a href={"/allebooking"}><i className="fa fa-list" />Travel Booking</a></li>
              </ul>
            </li>
            <li className={(this.getUrlParams('allpagelist')?("active"):"")}><a href={"/allpagelist"}><i className="fa fa-language"/><span>Static Pages</span></a></li>
           
            
           
            <li className={(((this.getUrlParams('setting') || this.getUrlParams('sittingtype') || this.getUrlParams('homepagebanner')))?("treeview active menu-open"):"treeview")}>
              <a href="#">
                <i className="fa fa-gear" /> <span>Global Managment</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
              <li className={(this.getUrlParams('setting')?("active"):"")}><a href={"/setting"}><i className="fa fa-gear" /><span>General Setting</span></a></li>
              <li className={(this.getUrlParams('sittingtype')?("active"):"")}><a href={"/sittingtype"}><i className="fa fa-wheelchair"/>Sitting Type</a></li>
              <li className={(this.getUrlParams('homepagebanner')?("active"):"")}><a href={"/homepagebanner"}><i className="fa fa-image"/>Banner Management</a></li>
                {/* <li><a href="#"><i className="fa fa-scissors"/>Offers Type</a></li> */}
                {/* <li><a href="#"><i className="fa fa-globe"/>Tax Type</a></li> */}
                {/* <li><a href="#"><i className="fa fa-calendar-check-o" />Booking Status</a></li> */}
                {/* <li><a href="#"><i className="fa fa-language"/>Language Type</a></li> */}
              </ul>
            </li>
            <li className={(this.getUrlParams('membership')?("active"):"")}><a href={"/membership"}><i className="fa fa-bookmark"/><span>Membership Plan</span></a></li>

            
            
             {/* <li className="treeview menu-open">
              <a href="#">
                <i className="fa fa-map" /> <span>Location</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li><a href="#"><i className="fa fa-globe" />Country</a></li>
                <li><a href="#"><i className="fa fa-globe" />State</a></li>
                <li><a href="#"><i className="fa fa-globe" />City</a></li>
              </ul>
            </li> */}
           
            
            <li className={(this.getUrlParams('memberlist')?("active"):"")}>
              <a href="/memberlist">
                <i className="fa fa-users" />
                <span>User Management</span>
                <span className="pull-right-container">
                  <span className="label label-primary pull-right"></span>
                </span>
              </a>
            </li>
            
            
            <li className={(((this.getUrlParams('addevent') || this.getUrlParams('eventlist') || this.getUrlParams('addtheatre') || this.getUrlParams('alltheatre')))?("treeview active menu-open"):"treeview")}>
              <a href="#">
                <i className="fa fa-file-movie-o" />
                <span>Manage Event~Theatre</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li className={(this.getUrlParams('addevent')?("active"):"")}><a href={"/addevent"}><i className="fa fa-plus" />Add New Event</a></li>
                <li className={(this.getUrlParams('eventlist')?("active"):"")}><a href={"/eventlist"}><i className="fa fa-list" />All Event List</a></li>
                <li className={(this.getUrlParams('addtheatre')?("active"):"")}><a href={"/addtheatre"}><i className="fa fa-plus" />Add Theatre</a></li>
                <li className={(this.getUrlParams('alltheatre')?("active"):"")}><a href={"/alltheatre"}><i className="fa fa-list" />All Theatre</a></li>
              </ul>
            </li>
            
           

            <li className={(((this.getUrlParams('additineraries') || this.getUrlParams('allitineraries')))?("treeview active menu-open"):"treeview")}>
              <a href="#">
                <i className="glyphicon glyphicon-globe" />
                <span>Manage Travel Exp</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li className={(this.getUrlParams('additineraries')?("active"):"")}><a href={"/additineraries"}><i className="fa fa-plus" />Add Travel Experience</a></li>
                <li className={(this.getUrlParams('allitineraries')?("active"):"")}><a href={"/allitineraries"}><i className="fa fa-list" />All Travel Experience</a></li>
              </ul>
            </li>
            <li className={(((this.getUrlParams('adddestination') || this.getUrlParams('alldestination')))?("treeview active menu-open"):"treeview")}>
              <a href="#">
                <i className="fa fa-globe" />
                <span>Manage Destination</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li className={(this.getUrlParams('adddestination')?("active"):"")}><a href={"/adddestination"}><i className="fa fa-plus" />Add Destination</a></li>
                <li className={(this.getUrlParams('alldestination')?("active"):"")}><a href={"/alldestination"}><i className="fa fa-list" />All Destination</a></li>
              </ul>
            </li>
           
          
            <li>
              <a href="allviedos">
                <i className="glyphicon glyphicon-calendar" /> <span>Review Viedos</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green"></small>
                </span>
              </a>
            </li>
            {/* <li className="treeview">
              <a href="#">
                <i className="fa fa-laptop" />
                <span>Report</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/UI/general.html"><i className="fa fa-users" />Customer Report</a></li>
                <li><a href="pages/UI/icons.html"><i className="fa fa-calendar-check-o" />Booking Report</a></li>
                <li><a href="pages/UI/buttons.html"><i className="fa fa-rupee" />Payment Report</a></li>
              </ul>
            </li> */}
            {/* <li>
              <a href="pages/mailbox/mailbox.html">
                <i className="fa fa-envelope" /> <span>Mailbox</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-red">16</small>
                </span>
              </a>
            </li> */}
          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
        );
    };
}
export default LeftSideBar;
