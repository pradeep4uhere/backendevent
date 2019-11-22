/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React , { Component } from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import $ from 'jquery';
import Breadcrum from '../../BreadcrumPage';
import ImageUploader from 'react-images-upload';

//import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-grid-gallery';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
const urlSaveImgStr = Constants.ITINERARIES_IMAGE_UPLOAD;
const urlDelImgStr  = Constants.ITINERARIES_DELETE_IMAGE_API;  
const urlDefaultStr = Constants.ITINERARIES_DEFAULT_IMAGE_API;
const urlStatusStr = Constants.EVENT_STATUS_IMAGE_API
const token     = localStorage.getItem('token');

class ItinerariesGalleryPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            eventId         : this.props.id,
            className       : '',
            titleText       : '',
            message         : '',
            pictures        : [],
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
        this.onDrop         = this.onDrop.bind(this);
        this.getGalleryList = this.getGalleryList.bind(this); 
    }


    onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
        const formData={
            id : this.props.id,
            token:token,
            imageStr : pictureDataURLs
        }
        axios.post(urlSaveImgStr, formData)
        .then((response) => {
        if(response.data.data.code==200) {
            this.setState({
                message     : response.data.data.message,
                classstr    : 'alert alert-success',
                className   : 'success',
                isMsg       : true,
            });
            $("#formTheatre").trigger("reset");
            this.setState({
                pictures: [],
                ImageGallery:response.data.data.imagesList
            });
        }
        else
        {
            this.setState({ 
                message:response.data.message,
                className   : 'error',
                classstr    : 'alert alert-danger',
                isMsg       : true,
            });
            
        }
        })
        .catch((err) => {
            console.log("Error: ", err);
            this.setState({message:err});
            this.setState({className:'error'});
            this.setState({ isMsg: true });
            this.setState({classstr: 'alert alert-danger'});
        })
        
    }

    getGalleryList(){
        const formData={
            id : this.props.id,
            token:token,
        }
        axios.post(urlSaveImgStr, formData)
        .then((response) => {
        if(response.data.data.code==200) {
            this.setState({
                ImageGallery:response.data.data.imagesList,
                titleText:response.data.data.details.title
            });
        }else{
            this.setState({ 
                message:response.data.message,
                className   : 'error',
                classstr    : 'alert alert-danger',
                isMsg       : true,
            });
        }}).catch((err) => {
            console.log("Error: ", err);
            this.setState({message:err});
            this.setState({className:'error'});
            this.setState({ isMsg: true });
            this.setState({classstr: 'alert alert-danger'});
        })
    }

    componentDidMount() {
        
        this.getGalleryList();
    }

    /*
     * Remove Image form Event
     */    
    deleteForm(e,id) {
        const formData={id : id,token:token,}
        axios.post(urlDelImgStr, formData)
        .then((response) => {
        if(response.data.data.code==200) {
            this.setState({
                message     : response.data.data.message,
                className   : 'success',
                classstr    : 'alert alert-success',
                isMsg       : true,
            });
            this.getGalleryList();
        }else{
            this.setState({ 
                message:response.data.data.message,
                className   : 'error',
                classstr    : 'alert alert-danger',
                isMsg       : true,
            });
        }}).catch((err) => {
            console.log("Error: ", err);
        })
    }

    /*
     * Make Default Image for Event
     */  
    makeDefault(e,id) {
        const formData={id : id,token:token,}
        axios.post(urlDefaultStr, formData)
        .then((response) => {
        if(response.data.data.code==200) {
            this.setState({
                message     : response.data.data.message,
                className   : 'success',
                classstr    : 'alert alert-success',
                isMsg       : true,
            });
            this.getGalleryList();
        }else{
            this.setState({ 
                message:response.data.data.message,
                className   : 'error',
                classstr    : 'alert alert-danger',
                isMsg       : true,
            });
        }}).catch((err) => {
            console.log("Error: ", err);
        })
    }

     /*
     * Make Default Image for Event
     */  
    updateStatus(e,id) {
        const formData={id : id,token:token,}
        axios.post(urlStatusStr, formData)
        .then((response) => {
        if(response.data.data.code==200) {
            this.setState({
                message     : response.data.data.message,
                className   : 'success',
                classstr    : 'alert alert-success',
                isMsg       : true,
            });
            this.getGalleryList();
        }else{
            this.setState({ 
                message:response.data.data.message,
                className   : 'error',
                classstr    : 'alert alert-danger',
                isMsg       : true,
            });
        }}).catch((err) => {
            console.log("Error: ", err);
        })
    }
    
    render(){
        const { ImageGallery } = this.state;
        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;

        console.log(this.state.ImageGallery);
        let Option = this.state.ImageGallery.map((val,i) =>
        <tr>
        <td>{i+1}</td>
        <td><img src={val.thumbnail} width={180}/></td>
        <td><p className="pull-right mt-4" style={{"padding-top":"18%"}}>
        {
          (val.status==1)?(<a href="#" className="btn btn-success" onClick={((e) => this.updateStatus(e, val.id))}>Active</a>):(<a href="#" className="btn btn-warning" onClick={((e) => this.updateStatus(e, val.id))}>InActive</a>)
        }
       &nbsp;
       {
          (val.is_default==1)?(<a href="#" className="btn btn-success" onClick={((e) => this.makeDefault(e, val.id))}>Default</a>):(<a href="#" className="btn btn-warning" onClick={((e) => this.makeDefault(e, val.id))}>Default</a>)
        }
        &nbsp;  
        <a href="#" className="btn btn-danger" onClick={((e) => this.deleteForm(e, val.id))}><i className="fa fa-trash"></i></a></p>
        </td>
        </tr>
        );
        return(
                
                <div className="content-wrapper">
                {/* Import Breadcrup component boxes here */}
                <Breadcrum title="Travel Experience Image Gallery" titleRight='All Travel Experience List' url='allitineraries' />
                    <section className="content">
                    <div className="row">
                    
                    <div className="col-md-4">
                    <div className="box box-info">
                    <div className="box-header with-border">
                    <h3 className="box-title">{this.state.titleText}:: All Image List</h3>
                    </div>
                    {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
                    <div className="box-body">
                    <table id="example1" class="table table-bordered table-striped" style={{"font-size":"12px"}}>
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Image</th>
                        <th nowrap="nowrap" style={{"width":"150"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody style={{"font-size":"12px"}}>
                    {Option}
                    </tbody>
                    </table>
                    
                    </div>
                    </div>
                    </div>
                    <div className="col-md-8">
                    <div className="box box-info">
                    <div className="box-header with-border">
                    <h3 className="box-title">{this.state.titleText}::Upload New Image </h3>
                    </div>
                    <div className="box-body">
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                    <hr/>
                    <Gallery images={ImageGallery}/>
                    </div>
                    </div>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default ItinerariesGalleryPage;
