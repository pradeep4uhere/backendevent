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
const urlStr    = Constants.SEATING_TYPE_LIST;
const token     = localStorage.getItem('token');
class SittingList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sittingList    : [],
            isMsg       : false,
            className   : '',
            show        : false,
            redirectToReferrer  : false,
        }
        this.getSittingList     = this.getSittingList.bind(this);
        this.capitalize         = this.capitalize.bind(this);
    }


    /******Get all the user list here********/   
    getSittingList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.code==200) {
              console.log(response.data.sitting);
                this.setState({
                    sittingList    : response.data.sitting,
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
       this.getSittingList();
    }

    capitalize(str) {
        var strVal = '';
        str = str.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
          strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
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
       const { sittingList }        =  this.state; 
       let optionItems = sittingList.map((val,i) =>
        <tr>
            <td>{val.id}</td>
            <td><a href="#">{this.capitalize(val.sitting_type_name)}</a></td>
            <td>{(val.status==1)?(<span className='label label-success'>Active</span>):(<span className='label label-danger'>In Active</span>)}</td>
            <td>{val.created_at}</td>
            <td>
                <a href={"editsitting?"+val.id}><i className="fa fa-pencil"></i></a>&nbsp;&nbsp; 
                <a href="#"><i className="fa fa-trash"></i></a></td>
        </tr>
        );
        return(
            <div className="row">
              <div className="col-md-12">
                <Message title={this.state.className}    Msg='Your message goes here' show={this.isMsg}/>
                <div className="box box-info">
                <div className="box-header with-border">
                <h3 className="box-title">All Seating List</h3>
                <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                <table className="table no-margin">
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Created On</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {optionItems}
                    </tbody>
                </table>
                </div>
                {/* /.table-responsive */}
                </div>
                </div>
                </div>
                </div>
      );
    };
}
export default SittingList;
