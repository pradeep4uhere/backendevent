/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import State from '../../../json/rd_states.json';
import Country from '../../../json/rd_countries.json';
import City from '../../../json/rd_cities.json';
import $ from 'jquery';

const urlStr    = Constants.EVENT_SAVE_DETAILS_API_POST;
const urlLocationStr = Constants.EVENT_GET_DETAILS_API_POST;
const token     = localStorage.getItem('token');
const state     = State;
const country   = Country;
const city      = City;
const event_id  = localStorage.getItem('event_id');
class LocationTab extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all event details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : '',
            country_id      : '',
            state_id        : '',
            city_id         : '',
            language_id     : ''
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.getEventLocationDetails = this.getEventLocationDetails.bind(this);
    }


    /**********Login Form Handle********************/
    handleSubmit(event) {
      event.preventDefault();
      var language    = event.target.language.value;
      var country     = event.target.country.value;
      var state       = event.target.state.value;
      var city        = event.target.city.value;
      var event_id    = localStorage.getItem('event_id');

      //Validation all the fields here
      if(language==''){
          this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose language of the event', hasDesError : 'has-error' });
      }else if(country==''){
          this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose country of the event', hasDError : 'has-error' });
      }else if(state==''){
          this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select state of the event', hasSError : 'has-error' });
      }else if(city==''){
        this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select city of the event', hasSError : 'has-error' });
      }else{
          this.setState({ isMsg : false});
          this.setState({ hasDesError : ''});
          this.setState({ hasDError : ''});
          this.setState({ hasSError : ''});
          this.setState({ hasTError : ''});
      }

      if(language!='' && country!='' && state!='' && city!=''){
          const formData = {
                  language    : language,
                  country     : country,
                  state       : state,
                  city        : city,
                  event_id    : event_id,
                  token       : token
          }

          this.setState({
            country_id  : country,
            state_id    : state,
            city_id     : city,
            language_id : language
          });
          axios.post(urlStr, formData)
            .then((response) => {
              console.log(response);
              if(response.data[0].code==200) {
                console.log("Inside"+response);
                this.setState({
                      message     : response.data[0].message,
                      classstr    : 'alert alert-success',
                      className   : 'success',
                      isMsg       : true,
                });
              }
              else
              {
                  this.setState({ 
                      message:response.data[0].message,
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
                //this.setState({isMsg:true});
                this.setState({classstr: 'alert alert-danger'});
            })
  
      }


     
  }

    getEventLocationDetails(){
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            event_id  : event_id
        }
        axios.post(urlLocationStr, formData)
        .then((response) => {
          var response = response.data[0];          
          if(response.code==200) {
            console.log(response.data[0].city_id);
                this.setState({
                    event       : response.data,
                    country_id  : response.data[0].country_id,
                    state_id    : response.data[0].state_id,
                    city_id     : response.data[0].city_id,
                    language_id : response.data[0].language_id
                });
                $('.overlay').hide();
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
      this.getEventLocationDetails();
    }


    render(){
      const { isMsg }         = this.state;
      const { classstr }      = this.state;
      const { message }       = this.state;

      const { country_id }    = this.state;
      const { state_id }      = this.state;
      const { city_id }       = this.state;
      const { language_id }   = this.state;

      let stateListOption = state.map((val,i) =>
        <option value={val.id}>{val.state_name}</option>
      );
      let countryListOption = country.map((val,i) =>
        <option value={val.id}>{val.name}</option>
      );

      let cityListOption = city.map((val,i) =>
        <option value={val.id}>{val.city_name}</option>
      );
      $('#language').val(language_id).attr('selected','selected');
      $('#country').val(country_id).attr('selected','selected');
      $('#state').val(state_id).attr('selected','selected');
      $('#city').val(city_id).attr('selected','selected');
      return(
            <div className="row">
            {/* <Message title={MsgClass} Msg={Msg} show={show}/> */}
            <div>{(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}</div>
            <div className="col-md-4">
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fa fa-map" />
                <h3 className="box-title">Location Details</h3>
              </div>
                <div className="box-body">  
                  <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                    <dl>
                    <dt>Language</dt>
                      <select className="form-control" id="language" name="language">
                        <option value="">Choose Language</option>
                          <option value="1">Hindi</option>
                          <option value="2">English</option>
                      </select>
                    <br/>
                    <dt>Country</dt>
                    <select className="form-control" id="country" name="country">
                        <option value="">Choose Country</option>
                          {countryListOption}
                      </select>
                    <br/>
                    <dt>State</dt>
                    <select className="form-control" id="state" name="state">
                        <option value="">Choose State</option>
                          {stateListOption}
                      </select>
                    <br/>
                    <dt>City</dt>
                    <select className="form-control" id="city" name="city">
                        <option value="">Choose City</option>
                          {cityListOption}
                      </select>
                    </dl>
                    <br/>
                    <div class="box-footer"><button type="submit" class="btn btn-default">Cancel</button>&nbsp;<button type="submit" class="btn btn-primary">Submit</button></div>
                    </form>
                </div>
                </div>
             </div>
            </div>
      );
    };
}

export default LocationTab;
