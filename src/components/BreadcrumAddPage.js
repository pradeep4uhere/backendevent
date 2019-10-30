import React from 'react';
import Constants  from '../config/Constants'
const appName = Constants.APP_NAME
const appTag = Constants.APP_TAG
class BreadcrumAddPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title       : this.props.title,
            titleRight  : this.props.titleRight,
            url         : this.props.url,
        };
    }
    render(){
        return(
        <section className="content-header">
        <h1>
            {this.props.title}
            <small>{appName}{appTag}</small>
        </h1>
        <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
            <li className="active"><a href={this.props.url}>{this.props.titleRight}</a></li>
            <li className="active"><a href={'/additineraryday'}>{'Add Itinerary Day'}</a></li>
        </ol>
        </section>
      );
    };
}
export default BreadcrumAddPage;
