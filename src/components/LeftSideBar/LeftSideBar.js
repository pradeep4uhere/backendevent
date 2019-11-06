/*
 * @PageName    :: LeftsideBar.js
 * @Author      :: Pradeep Kumar
 * @Description :: Left Menu of the profile
 * @Created Date:: 20 Oct 2018
 */
import React from 'react';
import Constants  from '../../config/Constants'
import {Link } from "react-router-dom";
const userProfileImg = Constants.IMG.USER_PROFILE
class LeftSideBar extends React.Component{
    constructor() {
        super();
        this.state = {
            clicked: false,
        };
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
            
           
            <li className="treeview menu-open">
              <a href="#">
                <i className="fa fa-gear" /> <span>Global Managment</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
              <li><a href={"/setting"}><i className="fa fa-gear" /><span>General Setting</span></a></li>
              <li><a href={"/sittingtype"}><i className="fa fa-wheelchair"/>Sitting Type</a></li>
              <li><a href={"/homepagebanner"}><i className="fa fa-image"/>Banner Management</a></li>
                {/* <li><a href="#"><i className="fa fa-scissors"/>Offers Type</a></li> */}
                {/* <li><a href="#"><i className="fa fa-globe"/>Tax Type</a></li> */}
                {/* <li><a href="#"><i className="fa fa-calendar-check-o" />Booking Status</a></li> */}
                {/* <li><a href="#"><i className="fa fa-language"/>Language Type</a></li> */}
              </ul>
            </li>
            <li><a href={"/membership"}><i className="fa fa-bookmark"/><span>Membership Plan</span></a></li>

            <li><a href={"/allpagelist"}><i className="fa fa-language"/><span>Static Pages</span></a></li>
            
            
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
            
            <li>
              <a href="/memberlist">
                <i className="fa fa-users" />
                <span>User Management</span>
                <span className="pull-right-container">
                  <span className="label label-primary pull-right"></span>
                </span>
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-globe" />
                <span>Destination Management</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li><a href={"/adddestination"}><i className="fa fa-plus" />Add Destination</a></li>
                <li><a href={"/alldestination"}><i className="fa fa-list" />All Destination</a></li>
              </ul>
            </li>
            
            <li className="treeview">
              <a href="#">
                <i className="fa fa-file-movie-o" />
                <span>Event & Theatre Management</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li><a href={"/addevent"}><i className="fa fa-plus" />Add New Event</a></li>
                <li><a href={"/eventlist"}><i className="fa fa-list" />All Event List</a></li>
                <li><a href={"/addtheatre"}><i className="fa fa-plus" />Add Theatre</a></li>
                <li><a href={"/alltheatre"}><i className="fa fa-list" />All Theatre</a></li>
              </ul>
            </li>
            
           

            <li className="treeview">
              <a href="#">
                <i className="glyphicon glyphicon-globe" />
                <span>Itineraries Management</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li><a href={"/additineraries"}><i className="fa fa-plus" />Add Itineraries</a></li>
                <li><a href={"/allitineraries"}><i className="fa fa-list" />All Itineraries</a></li>
              </ul>
            </li>
            <li>
              <a href="allbooking">
                <i className="glyphicon glyphicon-calendar" /> <span>Event Booking</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green"></small>
                </span>
              </a>
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
