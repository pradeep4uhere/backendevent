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
import { formValidation } from 'reactjs-input-validator';
 
const urlStr = Constants.THEATRE_ADD_URL;
const state     = State;
const country   = Country;
const city      = City;
const token     = localStorage.getItem('token');
class AddTheatreForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
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
            isValidForm     : false
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }




    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        const isFormValid = formValidation(this.state.data);
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
    
        }else {
           this.setState({ callAPI: true, shouldValidateInputs: !isFormValid });
        }
    }

    render(){
        const passwordValue = this.state.data.password && this.state.data.password.value;
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

        let stateListOption = state.map((val,i) =>
        <option value={val.id}>{val.state_name}</option>
        );
        let countryListOption = country.map((val,i) =>
            <option value={val.id}>{val.name}</option>
        );

        let cityListOption = city.map((val,i) =>
            <option value={val.id}>{val.city_name}</option>
        );
        return(
            <section className="content">
            <div className="row">
            <div className="col-md-12">
            <Message title={MsgClass} Msg={Msg} show={show}/>   
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Add New Theatre</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} id="formTheatre">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                    
                    <dt>Theatre Name</dt>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter theatre title" />
                    </div>
                    <div className={"form-group"+" "+hasCNError}>
                        <dt htmlFor="exampleInputPassword1">Company Name</dt>
                        <input type="text" className="form-control" id="company_name" name="company_name" placeholder="Enter company name" />
                    </div>
                
                    <div className={"form-group"+" "+hasConError}>
                    <dt>Contact Number:</dt>
                     <input type="text" className="form-control" id="contact_number" name="contact_number" placeholder="Enter conatc number"/>
                    </div>  

                    <div className={"form-group"+" "+hasEmailError}>
                        <dt htmlFor="exampleInputPassword1">Email Address</dt>
                        <input type="email" className="form-control" id="email_address" placeholder="Enter email address" />
                    </div>

                    <div className={"form-group"+" "+hasCError}>
                    <dt>Country</dt>
                    <select className="form-control" id="country" name="country">
                        <option value="">Choose Country</option>
                          {countryListOption}
                      </select>
                    </div>

                    <div className={"form-group"+" "+hasSError}>
                    <dt>State</dt>
                    <select className="form-control" id="state" name="state">
                        <option value="">Choose State</option>
                          {stateListOption}
                      </select>
                    </div>

                    <div className={"form-group"+" "+hasCityError}>
                    <dt>City</dt>
                    <select className="form-control" id="city" name="city">
                        <option value="">Choose City</option>
                          {cityListOption}
                      </select>
                    </div>

                    <div className={"form-group"+" "+hasAddError}>
                        <dt htmlFor="exampleInputPassword1">Address</dt>
                        <input type="text" className="form-control" id="address" placeholder="Enter address" />
                    </div>

                    <div className={"form-group"+" "+hasZError}>
                        <dt htmlFor="exampleInputPassword1">ZipCode</dt>
                        <input type="text" className="form-control" id="zipcode" placeholder="Enter zipcode" />
                    </div>

                  
                    <div className={"form-group"+" "+hasStatusError}>
                    <dt htmlFor="inputEmail3">Status</dt>
                            <select className="form-control" id="status" name="status">
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
        </section>
       );
    };
}
export default AddTheatreForm;
