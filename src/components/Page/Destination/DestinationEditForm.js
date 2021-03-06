/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import CKEditor from 'ckeditor4-react';
const urlStr        = Constants.DESTINATION_UPDATE_URL;
const urlEventStr   = Constants.DESTINATION_DETAILS_URL;
const token         = localStorage.getItem('token');
class DestinationEditForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventId         : this.props.id,
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all page details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : '',
            isOverlay       : true,
            event           : {},
            pictures        : [],
            description     : '',
            shopping        : '',
            cuisine         : '',
            more_information: '',
            ImageGallery    : [
                {
                        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
                        thumbnailWidth: 320,
                        thumbnailHeight: 174,
                        isSelected: false,
                        caption: "After Rain (Jeshu John - designerspics.com)"
                }
          ]
        };
        this.handleSubmit           = this.handleSubmit.bind(this);
        this.handleChange           = this.handleChange.bind(this);
        this.getEventDetails        = this.getEventDetails.bind(this);
        this.handleChangeText       = this.handleChangeText.bind(this);
        this.handleChangeShopping   = this.handleChangeShopping.bind(this);
        this.handleChangeCuisine    = this.handleChangeCuisine.bind(this);
        this.handleChangeMoreInformation= this.handleChangeMoreInformation.bind(this);
        
    }



    handleChange(e) {
        var strid = e.target.id;
        if(strid=='title'){
            this.setState({
                event : {
                    title : e.target.value
                    }
                });
        }
        if(strid=='description'){
            this.setState({
                event : {
                    description : e.target.value
                }
            });
        }
        if(strid=='altitude'){
            this.setState({
                event : {
                    altitude : e.target.value
                }
            });
        }
        if(strid=='climate'){
            this.setState({
                event : {
                    climate : e.target.value
                }
            });
        }
        if(strid=='population'){
            this.setState({
                event : {
                    population : e.target.value
                }
            });
        }
       
        if(strid=='status'){
            this.setState({
                theatre : {
                    status : e.target.value
                }
            });
        }
    }


    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        var id              = this.props.id;
        var title           = event.target.title.value;
        var descriptions    = this.state.description;
        var altitude        = event.target.altitude.value;
        var climate         = event.target.climate.value;
        var population      = event.target.population.value;
        var shopping        = this.state.shopping;
        var cuisine         = this.state.cuisine;
        var more_information= this.state.more_information;
        var trip_type       = event.target.trip_type.value;
        var status          = event.target.status.value;
        // alert(descriptions/);
        //Validation all the fields here
        if(title==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter title of the destination', 
                hasTError : 'has-error' });
        }else if(descriptions==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter description of the destination', hasDesError : 'has-error' });
        }else if(altitude==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose altitude of the destination', hasDError : 'has-error' });
        }else if(climate==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose climate of the destination', hasDError : 'has-error' });
        }else if(population==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose population of the destination', hasDError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the destination', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(title!='' && descriptions!='' && altitude!='' && climate!='' &&population!=''){
            const formData = {
                id              : id,
                title           : title,
                description     : descriptions,
                altitude        : altitude,
                climate         : climate,
                population      : population,
                shopping        : shopping,
                cuisine         : cuisine,
                more            : more_information,
                status          : status,
                trip_type       : trip_type,
                token           : token
            }
            axios.post(urlStr, formData)
              .then((response) => {
                  console.log(response);
                if(response.data.code==200) {
                  this.setState({
                        message     : response.data.message,
                        classstr    : 'alert alert-success',
                        className   : 'success',
                        isMsg       : true,
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
                  this.setState({classstr: 'alert alert-danger'});
              })
    
        }


       
    }




    getEventDetails(){
        this.setState({
          isOverlay  : true
        });
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            id        : this.props.id
        }
        axios.post(urlEventStr, formData)
        .then((response) => {
            
          if(response.data.code==200) {
              this.setState({
                  event       : response.data.data,
                  description : response.data.data.descriptions,
                  shopping    : response.data.data.shopping,
                  cuisine     : response.data.data.cuisine,
                  more_information: response.data.data.more_information,
                  status : response.data.data.status,
                  isOverlay  : false
              });
              console.log(response.data.data);
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

    componentDidMount(){
        this.getEventDetails();
      }


    handleChangeText(changeEvent) {
        this.setState({ description: changeEvent.editor.getData() });
    }

    handleChangeShopping(changeEvent) {
        this.setState({ shopping: changeEvent.editor.getData() });
    }

    handleChangeCuisine(changeEvent){
        this.setState({ cuisine: changeEvent.editor.getData() });
    }


    handleChangeMoreInformation(changeEvent){
        this.setState({ more_information: changeEvent.editor.getData() });
    }

    
    


    render(){
        const { MsgClass }      = this.state;
        const { Msg }           = this.state;
        const { show }          = this.state;
        const { hasTError }     = this.state;
        const { hasDesError }   = this.state;
        const { hasSError }     = this.state;
        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;
        const { isOverlay }     = this.state;
        let   editTitle        = this.state.event.title;
    
        console.log("this.event========");
        console.log(this.state.event);
        $('#status').val(this.state.event.status);
        return(
            <div className="row">
            <div className="col-md-12">
            {/* <div className="overlay" show={isOverlay}><i className="fa fa-refresh fa-spin"></i></div> */}
            {/* <Message title={MsgClass} Msg={Msg} show={show}/> */}
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Edit Destination Page::&nbsp;{editTitle}</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} enctype="multipart/form-data" id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Destination Title</dt>
                        <input type="text" className="form-control" id="title" placeholder="Enter Destination title" value={this.state.event.title} onChange = { this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Description</dt>
                        <CKEditor 
                            id="description"  
                            data={this.state.description}  
                            type="classic"
                            onChange={this.handleChangeText}
                            
                        />

                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Altitude</dt>
                        <input type="text" className="form-control" id="altitude" name="Altitude" placeholder="Enter Altitude Details" value= {this.state.event.altitude} onChange = {this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Climate</dt>
                        <input type="text" className="form-control" id="climate" name="climate" placeholder="Enter Climate Details" value= {this.state.event.climate} onChange = {this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Population</dt>
                        <input type="text" className="form-control" id="population" name="population" placeholder="Enter Population Details" value= {this.state.event.population} onChange = {this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Shopping</dt>
                        <CKEditor 
                            id="shopping"  
                            data={this.state.shopping}  
                            type="classic"
                            onChange={this.handleChangeShopping}
                            
                        />
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Cuisine</dt>
                        <CKEditor 
                            id="cuisine"  
                            data={this.state.cuisine}  
                            type="classic"
                            onChange={this.handleChangeCuisine}
                            
                        />
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>More Information</dt>
                        <CKEditor 
                            id="more"  
                            data={this.state.more_information}  
                            type="classic"
                            onChange={this.handleChangeMoreInformation}
                            
                        />
                        
                    </div>
                    <div className={"form-group"+" "+hasSError}>
                    <dt htmlFor="inputEmail3">Trip Type</dt>
                            <select className="form-control" id="trip_type">
                                <option value="Short Trip">Short Trip</option>
                                <option value="Long Trip">Long Trip</option>
                            </select>
                     </div>

                    
                    <div className={"form-group"+" "+hasSError}>
                    <dt htmlFor="inputEmail3">Status</dt>
                            <select className="form-control" id="status" value={this.state.status}>
                                <option value="1" selected="selected">Active</option>
                                <option value="0">In Active</option>
                            </select>
                     </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                    <button type="reset" className="btn btn-danger">Cancel</button>&nbsp;
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </div>
      );
    };
}

export default DestinationEditForm;
