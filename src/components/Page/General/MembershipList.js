/*
 * @PageName    :: LatestUserList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import $ from 'jquery';
import Setting from '../../../json/Setting.json'
const urlStr    = Constants.MEMBERSHIP_PLAN_LIST;
const token     = localStorage.getItem('token');

 
class MembershipList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            membershipList  : [],
            isMsg           : true,
            className       : 'success',
            color           : ['bg-yellow','bg-red','bg-green','bg-blue','bg-yellow','bg-red','bg-green','bg-blue'],
            classColor      : ['bg-red','bg-green']
            
        }
        this.getEventList       = this.getEventList.bind(this);
        this.handleClick        = this.handleClick.bind(this);
        this.capitalize         = this.capitalize.bind(this);
    
        this.openModal          = this.openModal.bind(this);
        this.afterOpenModal     = this.afterOpenModal.bind(this);
        this.closeModal         = this.closeModal.bind(this);

        this.stripHtml          = this.stripHtml.bind(this);
        this.handleRouteClick   = this.handleRouteClick.bind(this);
 
    }


    handleRouteClick = (e) => {
        e.preventDefault();
        var idStr = e.target.id;
        var idStrArr = idStr.split('|');
        var id = idStrArr[0];
        var str = idStrArr[1];
        localStorage.setItem('redirectPage','');
        if(str=='details'){
            localStorage.setItem('event_id',id);
            this.setState({redirectPage:'eventdetails'});
            this.setState({redirectToReferrer:true});
        }
        if(str=='gallery'){
            localStorage.setItem('event_id',id);
            this.setState({redirectPage:'eventgallery'});
            this.setState({redirectToReferrer:true});
        }
        
        
    };


    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            urlParams  : e.target.href
        });
        this.getUserList()
        
    };


    /******Get all the user list here********/   
    getEventList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            urlParams: this.state.urlParams
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.code==200) {
                this.setState({
                    membershipList    : response.data.membership,
                });
                $('#ipl-progress-indicator').hide();
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
       this.getEventList();
    }

    capitalize(str) {
        var strVal = '';
        str = str.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
          strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
    }


    //Open Modle box for user Either we can view or edit the user details here
    openModal(e) {
        var strId = e.target.id;
        var array   = strId.split("|");
        var userId  = array[0];
        var type    = array[1];
        this.setState({
              actiontype  : type
        });

        let optionItems = this.state.eventList.map((val,i) =>{
                if(val.id==userId){
                    this.setState({
                        eventDetails: val
                    });        
                }
        });
        this.setState({modalIsOpen: true});
    }
    
    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }


    render(){
       const { membershipList }     =  this.state; 
       let optionItems = membershipList.map((val,i) =>
                <div className="col-md-4">
                <div className="box box-widget widget-user-2">
                <div className={"widget-user-header "+this.state.color[i]}>
                    <div className="widget-user-image pull-left">
                        <i className="fa fa-bookmark" style={{'font-size':'65px'}}></i>
                    </div>
                    <h3 className="widget-user-username" style={{'text-transform':'uppercase'}}><strong>{val.name}</strong></h3>
                    <h3 className="widget-user-desc">INR {val.monthly_price}/month</h3>
                </div>
                <div className="box-footer no-padding">
                    <ul className="nav nav-stacked">
                    { val.membership_feature.map((v,j) =>
                        <li><a href="#">{v.feature_title} <span className={"pull-right"}>
                        {(v.status==1)?(<img src='../theme/dist/img/ok.png' width="25px"/>):(<img src='../theme/dist/img/del.png' width="25px"/>)}
                        </span></a></li>
                      )
                     }
                    </ul>
                    <div class="box-footer text-center"><a href="javascript:void(0)" class="uppercase"><strong> <i className="fa fa-pencil"></i> Update</strong></a></div>
                </div>
                
                </div>
                
            </div>
        );

        
        return(
            <section class="content">
          
            <div className="row">
                <div className="col-md-12">
                <div className="box box-solid">
                    <div className="box-header with-border">
                    <i className="fa fa-text-width" />
                    <h3 className="box-title">Title</h3>
                    </div>
                    <div className="box-body">
                    <blockquote>
                        <p>{Setting[12]['options_value']}</p>
                        <small>You can Change this Text from general setting, for edit Click on <a href="setting">General Setting</a></small>
                    </blockquote>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
           
                <Message title={this.state.className}    Msg='Your message goes here' show={this.isMsg}/>
                {optionItems}
                
                </div>
            </section>
          );
    };
}
export default MembershipList;
