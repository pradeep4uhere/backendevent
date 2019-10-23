/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Message from '../../../components/Message';
import State from '../../../json/rd_states.json';
import Country from '../../../json/rd_countries.json';
import City from '../../../json/rd_cities.json';
import Constants  from '../../../config/Constants'
const urlStr = Constants.THEATRE_UPDATE_URL;
const urlGetStr = Constants.THEATRE_URL;
const urlGetCity= Constants.GET_CITY_LIST_URL;
const state     = State;
const country   = Country;
const city      = City;
const token     = localStorage.getItem('token');
class EditTheatreForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all theatre details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : '',
            isValidForm     : false,
            theatre_id      : this.props.theatre_id,
            theatre         : {}
        };
        this.handleSubmit       = this.handleSubmit.bind(this);
        this.getTheatreDetails  = this.getTheatreDetails.bind(this);
        this.handleChange       = this.handleChange.bind(this);
        this.getCityList        = this.getCityList.bind(this);
    }


    handleChange(e) {
        var strid = e.target.id;
        if(strid=='title'){
            this.setState({
                theatre : {
                        theater_name : e.target.value
                    }
                });
        }
        if(strid=='company_name'){
            this.setState({
                theatre : {
                    company_name : e.target.value
                }
            });
        }
        if(strid=='contact_number'){
            this.setState({
                theatre : {
                    contact_number : e.target.value
                }
            });
        }
        if(strid=='email_address'){
            this.setState({
                theatre : {
                    email_address : e.target.value
                }
            });
        }
        if(strid=='country'){
            this.setState({
                theatre : {
                    country_id : e.target.value
                }
            });
        }
        if(strid=='state'){
            this.setState({
                theatre : {
                    state_id : e.target.value
                }
            });
        }
        if(strid=='city'){
            this.setState({
                theatre : {
                    city_id : e.target.value
                }
            });
        }
        if(strid=='address'){
            this.setState({
                theatre : {
                    address : e.target.value
                }
            });
        }
        if(strid=='zipcode'){
            this.setState({
                theatre : {
                    zipcode : e.target.value
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
        var id        	    = this.state.theatre_id;
        var title        	= event.target.title.value;
        var company_name   	= event.target.company_name.value;
        var contact_number 	= event.target.contact_number.value;
        var email_address  	= event.target.email_address.value;
        var country        	= event.target.country.value;
        var state          	= event.target.state.value;
        var city           	= event.target.city.value;
        var address        	= event.target.address.value;
        var zipcode        	= event.target.zipcode.value;
        var status         	= event.target.status.value;

        //Validation all the fields here
        if(title==''){
            this.setState({isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter title of the theatre', hasTError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasTError      : ''});
        }
        
        if(company_name==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter company name', hasCNError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasCNError      : ''});
        }
        
        if(contact_number==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose contact number', hasConError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasConError      : ''});
        }
        
        if(email_address==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter email address', hasEmailError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasEmailError      : ''});
        }
        
        if(country==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose country', hasCError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasCError   : ''});
        }
        
        if(state==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please state', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasSError   : ''});
        }
        
        if(city==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please city', hasCityError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasCityError: ''});
        }
        
        if(address==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please address', hasAddError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasAddError: ''});
        }
        
        if(zipcode==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please zipcode', hasZError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasZError   : ''});
        }
        
        if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status', hasStatusError : 'has-error' });
        }else{
                this.setState({ isMsg       : false});
                this.setState({ hasStatusError       : ''});
        }
        
        if(title!='' && company_name!='' && email_address!='' && contact_number!='' && email_address!='' && country!='' && state!='' && city!='' && address!='' && zipcode!='' && status!=''){
            const formData = {
                id              : id,
                title           : title,
                company_name    : company_name,
                email_address   : email_address,
                contact_number   : contact_number,
                country         : country,
                state           : state,
                city            : city,
                address         : address,
                zipcode         : zipcode,
                status          : status,
                token       : token
            }
            axios.post(urlStr, formData)
              .then((response) => {
                if(response.data.code==200) {
                  this.setState({
                        message     : response.data.message,
                        classstr    : 'alert alert-success',
                        className   : 'success',
                        isMsg       : true,
                  });
                  $("#formTheatre").trigger("reset");
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
    }


    //Get Theatre Details
    getTheatreDetails(){
        var id = this.state.theatre_id;
        //alert(id);
        const formData = {
            id    : id,
            token : token
        }
        axios.post(urlGetStr, formData)
        .then((response) => {
          if(response.data.code==200) {
            this.setState({
                  theatre     : response.data.theatre,
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



     //Get Theatre Details
     getCityList(){
        var id = this.state.state_id;
        //alert(id);
        const formData = {
            id    : id,
            token : token
        }
        axios.post(urlGetCity, formData)
        .then((response) => {
          if(response.data.code==200) {
            this.setState({
                  theatre     : response.data.theatre,
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


    



    componentDidMount() {
      this.getTheatreDetails();
    }

    render(){

        const { MsgClass }      = this.state;
        const { Msg }           = this.state;
        const { show }          = this.state;

        const { hasTError }     = this.state;
        const { hasCNError }    = this.state;
        const { hasConError }   = this.state;
        const { hasEmailError } = this.state;
        const { hasCError }     = this.state;
        const { hasSError }     = this.state;
        const { hasCityError }  = this.state;
        const { hasAddError }   = this.state;
        const { hasZError }     = this.state;
        const { hasStatusError }= this.state;


        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;

        const { theatre }       = this.state;
        const country_id        = this.state.theatre.country_id;
        const state_id          = this.state.theatre.state_id;
        const city_id           = this.state.theatre.city_id;
        const status            = this.state.theatre.status;
        
        let stateListOption = state.map((val,i) =>
        <option value={val.id}>{val.state_name}</option>
        );
        let countryListOption = country.map((val,i) =>
            <option value={val.id}>{val.name}</option>
        );

        let cityListOption = city.map((val,i) =>
            <option value={val.id}>{val.city_name}</option>
        );
        if(country_id != undefined){
            $('#country').val(country_id).attr('selected','selected');
        }

        if(state_id != undefined){
            $('#state').val(state_id).attr('selected','selected');
        }
        if(city_id != undefined){
            $('#city').val(city_id).attr('selected','selected');
        }

        if(status != undefined){
            $('#status').val(status).attr('selected','selected');
        }

        return(
            <section className="content">
            <div className="row">
            <div className="col-md-12">
            {/* <Message title={MsgClass} Msg={Msg} show={show}/>    */}
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Edit Theatre:: {this.state.theatre.theater_name}</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} id="formTheatre">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                    
                    <dt>Theatre Name</dt>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter theatre title" value={this.state.theatre.theater_name} onChange = { this.handleChange.bind(this)}/>
                    </div>
                    <div className={"form-group"+" "+hasCNError}>
                        <dt htmlFor="exampleInputPassword1">Company Name</dt>
                        <input type="text" className="form-control" id="company_name" name="company_name" placeholder="Enter company name" value={this.state.theatre.company_name} onChange = { this.handleChange.bind(this)}/>
                    </div>
                
                    <div className={"form-group"+" "+hasConError}>
                    <dt>Contact Number:</dt>
                     <input type="text" className="form-control" id="contact_number" name="contact_number" placeholder="Enter conatc number" value={this.state.theatre.contact_number} onChange = { this.handleChange.bind(this)}/>
                    </div>  

                    <div className={"form-group"+" "+hasEmailError}>
                        <dt htmlFor="exampleInputPassword1">Email Address</dt>
                        <input type="email" className="form-control" id="email_address" placeholder="Enter email address"  value={this.state.theatre.email_address} onChange = { this.handleChange.bind(this)}/>
                    </div>

                    <div className={"form-group"+" "+hasCError}>
                    <dt>Country</dt>
                    <select className="form-control" id="country" name="country" onChange = { this.handleChange.bind(this)}>
                        <option value="">Choose Country</option>
                          {countryListOption}
                      </select>
                    </div>

                    <div className={"form-group"+" "+hasSError}>
                    <dt>State</dt>
                    <select className="form-control" id="state" name="state" onChange = { this.handleChange.bind(this)}>
                        <option value="">Choose State</option>
                          {stateListOption}
                      </select>
                    </div>

                    <div className={"form-group"+" "+hasCityError}>
                    <dt>City</dt>
                    <select className="form-control" id="city" name="city" onChange = { this.handleChange.bind(this)}>
                        <option value="">Choose City</option>
                          {cityListOption}
                      </select>
                    </div>

                    <div className={"form-group"+" "+hasAddError}>
                        <dt htmlFor="exampleInputPassword1">Address</dt>
                        <input type="text" className="form-control" id="address" placeholder="Enter address" value={this.state.theatre.address} onChange = { this.handleChange.bind(this)}/>
                    </div>

                    <div className={"form-group"+" "+hasZError}>
                        <dt htmlFor="exampleInputPassword1">ZipCode</dt>
                        <input type="text" className="form-control" id="zipcode" placeholder="Enter zipcode" value={this.state.theatre.zipcode} onChange = { this.handleChange.bind(this)}/>
                    </div>

                  
                    <div className={"form-group"+" "+hasStatusError}>
                    <dt htmlFor="inputEmail3">Status</dt>
                            <select className="form-control" id="status" name="status" onChange = { this.handleChange.bind(this)}>
                                <option value="1">Active</option>
                                <option value="0">In Active</option>
                            </select>
                     </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                    <button type="reset" className="btn btn-default">Cancel</button>&nbsp;
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </div>
        </section>
       );
    };
}
export default EditTheatreForm;
