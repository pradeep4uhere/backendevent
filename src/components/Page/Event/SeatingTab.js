/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
const urlStr = Constants.EVENT_ADD_URL;
const token     = localStorage.getItem('token');
class SeatingTab extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        return(
            <div className="row">
            <div className="col-md-12">
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fa fa-text-width" />
                <h3 className="box-title">Event Timing</h3>
              </div>
                <div className="box-body">
                    <dl>
                    <dt>Title</dt>
                    <p>A description list is perfect for defining terms.</p>
                    <dt>Description</dt>
                    <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
                    <dt>Durration</dt>
                    <p>Etiam porta sem malesuada magna mollis euismod.</p>
                    </dl>
                </div>
                </div>
             </div>
            </div>
      );
    };
}

export default SeatingTab;
