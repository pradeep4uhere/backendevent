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
import EventGallery from '../Event/EventGallery';

const urlStr = Constants.EVENT_ADD_URL;
const token     = localStorage.getItem('token');
class ImageGalleryTab extends React.Component{
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
                <i className="fa fa-image" />
                <h3 className="box-title">Image Gallery</h3>
              </div>
                <div className="box-body">
               
                   <EventGallery/>
                </div>
                </div>
             </div>
            </div>
      );
    };
}

export default ImageGalleryTab;
