/*
 * @PageName    :: ItinerariesDayGalleryPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new Itineraries Day Gallery 
 * @Created Date:: 31 Oct 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import $ from 'jquery';
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-grid-gallery';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

const urlStr        = Constants.ITINERARIES_DAYS_LIST_URL;
const urlSaveImgStr = Constants.ITINERARIES_DAY_IMAGE_UPLOAD;
const token         = localStorage.getItem('token');
class ItinerariesDayGalleryViewPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventList       : [],
            imgGalleryList  : [],
            isMsg           : false,
            eventId         : this.props.id,
            id              : this.props.id,
            className       : '',
            message         : '',
            titleText       : '',
            pictures        : [],
            itineraryDay    : {},
            ImageGallery    : [
                                    {
                                            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                                            thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
                                            thumbnailWidth: 320,
                                            thumbnailHeight: 174,
                                            isSelected: false,
                                            caption: "After Rain (Jeshu John - designerspics.com)"
                                    },
                                    {
                                            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
                                            thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
                                            thumbnailWidth: 320,
                                            thumbnailHeight: 212,
                                            tags: [{value: "Ocean", title: "Ocean"}, {value: "Peoplessssss", title: "People"}],
                                            caption: "Boats (Jeshu John - designerspics.com)"
                                    }
                              ]


        };
        this.getGalleryList = this.getGalleryList.bind(this); 
        this.getItinerariesDaysList = this.getItinerariesDaysList.bind(this);
    }


    getGalleryList(ids){
        const formData={
            id : ids,
            token:token,
        }
        axios.post(urlSaveImgStr, formData)
        .then((response) => {
           
        if(response.data.data.code==200) {
            let temImageGAllery = [];
            this.setState({
                ImageGallery:response.data.data.imagesList,
                itineraryDay:response.data.data.itineraryDay,
                titleText:response.data.data.itineraryDay.title
            });
            temImageGAllery.push(response.data.data.imagesList);
            this.setState({
                ImageGallery:temImageGAllery,
            });
        }
      });
    }




    /******Get all the user list here********/   
    getItinerariesDaysList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            urlParams: this.state.urlParams,
            event_id : this.state.id
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.data.code==200) {
                this.setState({
                    eventList    : response.data.data.event.data,
                    event        : response.data.data.event,
                    titleName    : response.data.data.event.data[0].itinerary.title,
                    imgGalleryList: response.data.data.imgGalleryList,
                });
                let dayTab = this.state.eventList.map((val,i) =>
                     this.getGalleryList(val.id)
                );
                $('#ipl-progress-indicator').hide();
                //console.log("ImageGallery===",this.state.ImageGallery)


          }
          else
          {
            this.setState({isMsg:true});
            this.setState({className:'error'});
          }
        })
        .catch((err) => {
            this.setState({isMsg:true});
            this.setState({className:'error'});
        })
    }




    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }


    componentDidMount() {
        this.getItinerariesDaysList();
        //this.getGalleryList();
    }
    
    render(){
        const { eventList }     =  this.state; 
        const { ImageGallery }  = this.state;
        const {imgGalleryList}  = this.state;
        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;
        let dayName             = this.state.itineraryDay.day;
        let dayid               = this.state.itineraryDay.itinerary_id;
        //console.log("ImageGallery",ImageGallery);
        let optionItems = eventList.map((val,i) =>
            <li className={(i==0)?("active"):('')}> 
                <a href={"#tab_"+i+1} className={(i==0)?("active"):('')} data-toggle="tab" aria-expanded="true"><b>{val.place_name}&nbsp;::&nbsp;{val.day}</b></a>
            </li>                
        );


        let dayTab = imgGalleryList.map((val,i) =>
            <div className={(i==0)?("tab-pane active"):('tab-pane')}  id={"tab_"+i+1}>
                 <Gallery images={val}/>
            </div>
        );
        return(
            <div className="col-md-12">
                <div className="box-body box-info">
                <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                    {optionItems}
                </ul>
                <div className="tab-content">
                    {dayTab}
                </div>
            </div>
            </div>
            </div>
           );
    };
}
export default ItinerariesDayGalleryViewPage;
