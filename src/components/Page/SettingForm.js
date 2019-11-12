/*
 * @PageName    :: SettingPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: General Setting Page 
 * @Created Date:: 23 Apr 2019
 */
import React from 'react';
import Setting from '../../json/Setting.json'
import Message from '../../components/Message';
import Constants  from '../../config/Constants';
import axios from 'axios'
import $ from 'jquery';
var serialize = require('form-serialize');
const urlStr = Constants.GENERAL_SETTING_URL;
const urlStrUpdate = Constants.GENERAL_SETTING_UPDATE_URL;
const token     = localStorage.getItem('token');

class SettingForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            setting:[],
            successShow:false,
            errorShow:false
        };
        this.getSettingList       = this.getSettingList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange     = this.handleChange.bind(this);
    }


    handleChange(e) {
      console.log(e);
      let idStr = e.target.id;
      let data = this.state.setting[idStr];
      data['options_value'] = e.target.value;
      this.setState({ [this.state.setting[idStr]] : data});
      data ={};
    }


     /**********Login Form Handle********************/
     handleSubmit(event) {
      event.preventDefault();
      const form = event.currentTarget
      const body = serialize(form, {hash: true,empty:true})
      const formData = {
          token           : token,
          body            : body
      }
      axios.post(urlStrUpdate, formData)
        .then((response) => {
          if(response.data.code==200) {
            this.setState({
                  message     : response.data.message,
                  classstr    : 'alert alert-success',
                  className   : 'success',
                  isMsg       : true,
                  successShow : true,
                  errorShow   : false,
            });
          }
          else
          {
              this.setState({ 
                  message:response.data.message,
                  className   : 'error',
                  classstr    : 'alert alert-danger',
                  errorShow   : true,
                  successShow : false,
              });
            
          }
        })
        .catch((err) => {
            
            this.setState({message:err});
            this.setState({className:'error'});
            this.setState({ isMsg: true });
            this.setState({classstr: 'alert alert-danger'});
        })
  
      
  }

    /******Get all the user list here********/   
    getSettingList(){
      var tokenStr = token;
      const formData = {
          token    : tokenStr,
          urlParams: this.state.urlParams
      }
      
      axios.post(urlStr, formData)
      .then((response) => {
        if(response.data.code==200) {
              this.setState({
                setting    : response.data.data,
              });
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
    this.getSettingList();
  }

    render(){
    console.log(this.state.successShow);
    let setting = this.state.setting;
    //console.log(setting);
     let optionItems = this.state.setting.map((val,i) =>
        <div className="form-group">
              <label htmlFor="inputEmail3" className="col-sm-2 control-label">{val.title}</label>
              <div className="col-sm-6">      
                <input onChange = { this.handleChange.bind(this)} type="text" name={val.options+"__"+val.id} className="form-control" id={i} placeholder={val.title} value={this.state.setting[i].options_value} />
              </div>
        </div>
        
        );
     return(
            <div classname="box-body">
            {this.state.successShow ? (
              <Message title='success'  Msg={this.state.message} show="true"/>
              ) : ''
            }

            {this.state.errorShow ? (
              <Message title='error'  Msg={this.state.message} show="true"/>
              ) : ''
            }
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="box-body">
                {optionItems}
              </div>
              <div class="box-footer">
                <button type="submit" className="btn btn-default">Cancel</button>
                <button type="submit" className="btn btn-info pull-right">Update</button>
              </div>
              </form>
            </div>
            );
    };
}
export default SettingForm;
