/*
 * @PageName    :: EventViewPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for event details
 * @params      :: Props as event object directly getting from the parnet component
 * @Created Date:: 09 May 2019
 */
import React from 'react';
class EventViewPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Details     : this.props.event
        };
        this.capitalize     = this.capitalize.bind(this);

    }



    capitalize(str) {
        var strVal = '';
        str = str.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
          strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
    }

    
    render(){
        const { Details } = this.state;
        return(
            <div class="panel panel-primary">
            <div class="panel-heading">Event Details</div>
                <div className="box-body">
                <strong>Event Title</strong>
                <p className="text-muted">
                    {this.capitalize(Details.title)}
                </p>
                <hr />
                <strong>Durration</strong>
                <p className="text-muted">
                    {Details.durration}
                </p>
                
                <hr />
                <strong>Description</strong>
                <p className="text-muted">
                    {Details.description}
                </p>
                <hr />
                <strong>Status</strong>
                <p className="text-muted">
                {(Details.status==1)?(<span className='label label-success'>Active</span>):(<span className='label label-danger'>In Active</span>)}
                </p>
                <hr />
                <strong>Created On</strong>
                <p className="text-muted">
                    {Details.created_at}
                </p>
                </div>
        </div>
      );
    };
}
export default EventViewPage;
