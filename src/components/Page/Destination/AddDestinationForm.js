/*
 * @PageName    :: AddDestinationForm.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new destination 
 * @Created Date:: 11 Sept 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import CKEditor from 'ckeditor4-react';
import {$} from 'jquery';
const urlStr = Constants.DESTINATION_ADD_URL;
const token     = localStorage.getItem('token');
class AddDestinationForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please enter details of destination',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : '',
            description     : '',
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleChangeDescription  = this.handleChangeDescription.bind(this);
    }

    handleChangeDescription(changeEvent) {
        this.setState({ description: changeEvent.editor.getData() });
    }
    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var title           = event.target.title.value;
        var description     = this.state.description;
        var altitude        = event.target.altitude.value;
        var climate         = event.target.climate.value;
        var population      = event.target.population.value;
        var shopping        = event.target.shopping.value;
        var cuisine         = event.target.cuisine.value;
        var more            = event.target.more.value;
        var status          = event.target.status.value;
        var trip_type       = event.target.trip_type.value;

        //Validation all the fields here
        if(title==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter details of destination', 
                hasTError : 'has-error' });
        }else if(description==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter description of the destination', hasDesError : 'has-error' });
        }else if(altitude==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose altitude of the destination', hasDError : 'has-error' });
        }else if(climate==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose climate of the destination', hasDError : 'has-error' });
        }else if(population==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose population of the destination', hasDError : 'has-error' });
        }else if(shopping==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose shopping of the destination', hasDError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the destination', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(title!='' && description!='' && altitude!='' && climate!='' && population!='' && shopping!=''){
            const formData = {
                    title       : title,
                    description : description,
                    altitude    : altitude,
                    climate     : climate,
                    population  : population,
                    shopping    : shopping,
                    cuisine     : cuisine,
                    more        : more,
                    status      : status,
                    trip_type   : trip_type,
                    token       : token
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
                  $("#title").val("");
                  $("#description").val("");
                  $("#altitude").val("");
                  $("#climate").val("");
                  $("#population").val("");
                  $("#shopping").val("");
                }
                else
                {
                    this.setState({ 
                        message:response.data.data.message,
                        className   : 'error',
                        classstr    : 'alert alert-danger',
                        isMsg       : true,
                    });
                  
                }
              })
              .catch((err) => {
                  console.log("Error: ", err);
                  //this.setState({message:err});
                  //this.setState({className:'error'});
                  //this.setState({isMsg:true});
                  //this.setState({classstr: 'alert alert-danger'});
              })
    
        }


       
    }
    render(){
        const { MsgClass }      = this.state;
        const { Msg }           = this.state;
        const { show }          = this.state;
        const { hasTError }     = this.state;
        const { hasDesError }   = this.state;
        const { hasDError }     = this.state;
        const { hasSError }     = this.state;
        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;


        //alert(MsgClass+ show + Msg);
        console.log(this.state);
        return(
            <div className="row">
            <div className="col-md-12">
            <Message title={MsgClass} Msg={Msg} show={show}/>
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Add New Destination</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} enctype="multipart/form-data" id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Destination Title</dt>
                        <input type="text" className="form-control" id="title" placeholder="Enter destination title" />
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <dt htmlFor="exampleInputPassword1">Description</dt>
                        <CKEditor 
                            id="description"  
                            data={this.state.description}  
                            type="classic"
                            onChange={this.handleChangeDescription}
                            
                        />
                        {/* <textarea id="description" name="description" rows="10" cols="80"  className="form-control" placeholder="Enter Description of the destination">
                            
                        </textarea> */}
                    </div>
                      {/* <div className="form-group">
                        <dt htmlFor="exampleInputFile">Destination Banner</dt>
                        <input type="file" id="event_banner" name="event_banner" />
                        <p className="help-block">(only jpeg, jpg, png, gif file extenstion allowd).</p>
                    </div> */}
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Altitude</dt>
                        <input type="text" className="form-control" id="altitude" name="Altitude" placeholder="Enter Altitude Details" />
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Climate</dt>
                        <input type="text" className="form-control" id="climate" name="climate" placeholder="Enter Climate Details" />
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Population</dt>
                        <input type="text" className="form-control" id="population" name="population" placeholder="Enter Population Details" />
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Shopping</dt>
                        <textarea id="shopping" name="shopping" rows="10" cols="80"  className="form-control" placeholder="Enter shopping details here">
                            
                        </textarea>
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>Cuisine</dt>
                        <textarea id="cuisine" name="cuisine" rows="10" cols="80"  className="form-control" placeholder=" Enter cuisine details here">
                           
                        </textarea>
                    </div>
                    <div className={"form-group"+" "+hasTError}>
                        <dt>More Information</dt>
                        <textarea id="more" name="more" rows="10" cols="80"  className="form-control" placeholder="Enter more details here">
                          
                        </textarea>
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
                            <select className="form-control" id="status">
                                <option value="1">Active</option>
                                <option value="0">In Active</option>
                            </select>
                     </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                    <button type="submit" className="btn btn-default">Cancel</button>&nbsp;
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

export default AddDestinationForm;
