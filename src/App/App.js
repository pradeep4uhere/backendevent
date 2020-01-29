import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Dashboard      from '../components/Dashboard';
import Setting        from '../components/Setting';
import MemberList     from '../components/MemberList';
import EventList      from '../components/EventList';
import EventAdd       from '../components/EventAdd';
import EventEdit      from '../components/EditEvent';
import EventDetail    from '../components/EventDetail';
import EventGallery   from '../components/EventGallery';
import EventView      from '../components/EventView';

import AddItineraries from '../components/AddItineraries';
import AllItineraries from '../components/ItinerariesList';
import ItinerariesDaysList from '../components/ItinerariesDaysList';
import ItinerariesGallery from '../components/ItinerariesGallery';
import ItinerariesDayGallery from '../components/ItinerariesDayGallery';
import ItinerariesDepatureTiming from '../components/ItinerariesDepatureTiming';
import ItinerariesAddOns from '../components/ItinerariesAddOns';
import ItinerariesTerms from  '../components/ItinerariesTerms';

import EditItineraries  from '../components/EditItineraries';
import AddItinerariesDay from '../components/AddItinerariesDay';
import EditItinerariesDay from '../components/EditItinerariesDay';
import ItinerariesViewPage from '../components/ItinerariesViewPage';


import AddDestination from '../components/AddDestination';
import DestinationList from '../components/DestinationList';
import DestinationGallery   from '../components/DestinationGallery';
import DestinationEdit      from '../components/EditDestination';



import PageList       from '../components/PageList';
import PageEdit       from '../components/EditPage';

import Theatre        from '../components/Theatre';
import AddTheatre     from '../components/AddTheatre';
import EditTheatre    from '../components/EditTheatre';
import AddTheatreSeat from '../components/AddTheatreSeat';

import LocationTab    from '../components/LocationTab';
import EventTimingTab from '../components/EventTimingTab';

import SittingType    from '../components/SittingType';
import SittingList    from '../components/SittingList';
import SittingEdit    from '../components/SittingEdit';
import UserEdit       from '../components/UserEdit';

import ViedoList      from '../components/ViedoList';
import MembershipList from '../components/MembershipList';
import MembershipListEdit from '../components/MembershipListEdit';

import TaxEdit from '../components/TaxEdit';
import OfferManage from '../components/OfferManage';


import EventBooking   from '../components/EventBooking';
import TravelBooking   from '../components/TravelBooking';
import OrderDetails   from '../components/OrderDetails';
import HomeBannerGallery from '../components/HomeBannerGallery';

import UserOrderDetails   from '../components/UserOrderDetails';
import OrderInvoice   from '../components/OrderInvoice';
import TravelOrderInvoice from '../components/TravelOrderInvoice';





import Login, {user} from '../Login/Login';
import Logout from '../Logout';
import NotFound from '../components/NotFound';
import Register from '../Login/Register';
import Index from '../components/Index';
import $ from 'jquery';
class App extends Component {
  	constructor() {
  		super();
      this.state = {
        isLoggedIn:false,
        user: user
      }
      this.handler = this.handler.bind(this);
    }


  // This method will be sent to the child component
  handler() {
      this.setState({
          isLoggedIn: false
      });
  }


componentDidMount() {
    var userId= localStorage.getItem('user');
    if(localStorage.getItem('user')){
        this.setState({ isLoggedIn: true});    
    }else{
        this.setState({ isLoggedIn: false });    
    }
    $('#ipl-progress-indicator').hide();
}

render() {
     const { isLoggedIn } = this.state
     return (
      <div>
         <Router>
          <Switch>
              {/* <Route path="/" component={Dashboard} exact/> */}
              <Route path="/homepagebanner/" component={HomeBannerGallery}/>

              <Route path="/allbooking" component={EventBooking} exact />
              <Route path="/allebooking" component={TravelBooking} exact />

              <Route path="/order/:id?" component={OrderDetails}/>
              <Route path="/userorder/:id?" component={UserOrderDetails}/>
              <Route path="/orderinvoice/:id?" component={OrderInvoice}/>
              <Route path="/eorderinvoice/:id?" component={TravelOrderInvoice}/>
              
              <Route path="/additineraries" component={AddItineraries}  />
              <Route path="/viewitinerariedays/:id?" component={ItinerariesDaysList}  />
              <Route path="/edititinerarie/:id?" component={EditItineraries}  />
              <Route path="/allitineraries" component={AllItineraries}  />
              <Route path="/itinerariesgallery/:id?" component={ItinerariesGallery}/>
              <Route path="/itinerariesaddon/:id?" component={ItinerariesAddOns}/>
              <Route path="/itinerariestrems/:id?" component={ItinerariesTerms}/>
              <Route path="/traveldetails/:id?" component={ItinerariesViewPage}/>
              
              
              <Route path="/itinerariesdaysgallery/:id?" component={ItinerariesDayGallery}/>
              <Route path="/depaturetiming/:id?" component={ItinerariesDepatureTiming}/>
              <Route path="/additineraryday/:id?" component={AddItinerariesDay}/>
              <Route path="/edititinerarieday/:id?" component={EditItinerariesDay}  />
              

              <Route path="/setting" component={Setting} exact />
              <Route path="/dashboard"   render={() => <Dashboard/>} />
              <Route path="/hello" render={() => <div>Hello</div>} />
              <Route path="/memberlist" render={() => <MemberList/>} />
              <Route path="/membership" component={MembershipList}  />
              <Route path="/membershipedit/:id?" component={MembershipListEdit}/>
              <Route path="/taxedit" component={TaxEdit}/>
              <Route path="/eventview/:id?" component={EventView}/>
              <Route path="/offer" component={OfferManage}/>
              
              
              <Route path="/memberlist/{:page}" component={MemberList}  />

              <Route path="/sittingtype" component={SittingType}  />
              <Route path="/sittinglist" component={SittingList}  />
              <Route path="/editsitting/:id?" component={SittingEdit}/>
              <Route path="/useredit/:id?" component={UserEdit}/>

              <Route path="/eventlist" component={EventList}  />
              <Route path="/addevent" component={EventAdd}  />
              <Route path="/eventdetails/:id?" component={EventDetail}/>
              <Route path="/eventgallery/:id?" component={EventGallery}/>
              

              <Route path="/alltheatre" component={Theatre}/>
              <Route path="/addtheatre" component={AddTheatre}/>


              <Route path="/adddestination" component={AddDestination}/>
              <Route path="/alldestination" component={DestinationList}  />
              <Route path="/destinationgallery/:id?" component={DestinationGallery}/>
              <Route path="/editdestination/:id?" component={DestinationEdit}/>
              
              

              <Route path="/edittheatre/:id?" component={EditTheatre}/>
              <Route path="/addseat/:id?" component={AddTheatreSeat}/>

              <Route path="/eventlocation/:id?" component={LocationTab}/>
              <Route path="/eventtiming/:id?" component={EventTimingTab}/>
              <Route path="/editevent/:id?" component={EventEdit}/>

              <Route path="/allpagelist" component={PageList}  />
              <Route path="/editpage/:id?" component={PageEdit}/>

              <Route path="/allviedos" component={ViedoList}  />

              <Route path="/" component={Index} exact/>
              <Route path="/logout" component={Logout} exact/>
              <Route path="/login" component={Login} exact/>
              <Route path="/register" component={Register} exact/>
              <Route path="*" component={NotFound} exact/>
         </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
