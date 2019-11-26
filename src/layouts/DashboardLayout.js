import React from 'react';  
import Navigation           from '../components/Navigation';
import LeftSideBar          from '../components/LeftSideBar/LeftSideBar';
import DashboardPage        from '../components/Page/DashboardPage';
import SettingPage          from '../components/Page/SettingPage';
import MemberListPage       from '../components/Page/MemberListPage';
import EventListPage        from '../components/Page/Event/EventListPage';


import AddItinerariesPage   from '../components/Page/Itineraries/AddItinerariesPage';
import EditItinerariesPage   from '../components/Page/Itineraries/EditItinerariesPage';
import ItinerariesListPage  from '../components/Page/Itineraries/ItinerariesList';
import ItinerariesGalleryPage from '../components/Page/Itineraries/ItinerariesGalleryPage';
import ItinerariesDepatureTimingPage from '../components/Page/Itineraries/ItinerariesDepatureTimingPage';
import ItinerariesAddOnPage from '../components/Page/Itineraries/ItinerariesAddOnPage';
import ItinerariesTermsPage from '../components/Page/Itineraries/ItinerariesTermsPage';

import ItinerariesDaysListPage from '../components/Page/Itineraries/ItinerariesDaysListPage';
import  AddItinerariesDayPage from '../components/Page/Itineraries/AddItinerariesDayPage';
import EditItinerariesDayPage from '../components/Page/Itineraries/EditItinerariesDayPage';
import ItinerariesDayGalleryPage from '../components/Page/Itineraries/ItinerariesDayGalleryPage';



import EventAddPage         from '../components/Page/Event/EventAddPage';
import EditEventPage        from '../components/Page/Event/EditEventPage';
import EventDetailPage      from '../components/Page/Event/EventDetailPage';
import EventGalleryPage     from '../components/Page/Event/EventGalleryPage';

import AddDestinationPage   from '../components/Page/Destination/AddDestinationPage';
import DestinationListPage  from '../components/Page/Destination/DestinationListPage';
import DestinationGalleryPage   from '../components/Page/Destination/DestinationGalleryPage';
import EditDestinationPage  from '../components/Page/Destination/EditDestinationPage';


import TheatrePage          from '../components/Page/Theatre/TheatrePage';
import AddTheatrePage       from '../components/Page/Theatre/AddTheatrePage';
import EditTheatrePage      from '../components/Page/Theatre/EditTheatrePage';
import AddTheatreSeatPage   from '../components/Page/Theatre/AddTheatreSeatPage';

import LocationPage         from '../components/Page/Event/LocationPage';
import EventTimingPage      from '../components/Page/Event/EventTimingPage';
import SittingTypePage      from '../components/Page/SittingType/SittingTypePage';
import SittingListPage      from '../components/Page/SittingType/SittingListPage';
import SittingEditPage      from '../components/Page/SittingType/SittingEditPage';

import PageListPage         from '../components/Page/PageListPage';
import EditPagePage         from '../components/Page/StaticPage/EditPagePage';
import ViedoListPage        from '../components/Page/ViedoListPage';
import MembershipListPage   from '../components/Page/MembershipListPage';
import MembershipListEditPage from '../components/Page/MembershipListEditPage';

import EventBookingPage     from '../components/Page/EventBookingPage'; 
import TravelBookingPage    from '../components/Page/TravelBookingPage'; 

import OrderDetailsPage     from '../components/Page/OrderDetailsPage';   
import UserOrderDetailsPage from '../components/Page/UserOrderDetailsPage';   
import OrderInvoicePage     from '../components/Page/OrderInvoicePage';   
import TravelOrderInvoicePage   from '../components/Page/TravelOrderInvoicePage';   




import HomeBannerGalleryPage from '../components/Page/General/HomeBannerGalleryPage';





class DashboardLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loadComponent: this.props.component,
            id: this.props.id,
        };
    }
  
   render(){
    const { id } = this.state;
    console.log(this.props.component)
    return(
          <div className="hold-transition skin-blue sidebar-mini">
          <Navigation/> 
          <LeftSideBar/> 
          {
            {
              'DashboardPage'     : <DashboardPage  /> ,
              'SettingPage'       : <SettingPage    /> ,
              'MemberListPage'    : <MemberListPage /> ,
              'EventListPage'     : <EventListPage  /> ,
              'AddItinerariesPage': <AddItinerariesPage/> ,
              'EditItinerariesPage':<EditItinerariesPage id={id}/>,
              'ItinerariesListPage': <ItinerariesListPage/>,
              'ItinerariesGalleryPage':<ItinerariesGalleryPage id={id}/>,
              'ItinerariesDayGalleryPage':<ItinerariesDayGalleryPage id={id}/>,
              'ItinerariesDepatureTimingPage':<ItinerariesDepatureTimingPage id={id}/>,
              'ItinerariesAddOnPage':<ItinerariesAddOnPage id={id}/>,
              'ItinerariesTermsPage':<ItinerariesTermsPage id={id}/>,
              'ItinerariesDaysListPage':<ItinerariesDaysListPage id={id}/>,
              'AddItinerariesDayPage':<AddItinerariesDayPage id={id}/>,
              'EditItinerariesDayPage':<EditItinerariesDayPage id={id}/>,
              'EventAddPage'      : <EventAddPage   /> ,
              'EventDetailPage'   : <EventDetailPage/> ,
              'EventGalleryPage'  : <EventGalleryPage id={id}/> ,
              'TheatrePage'       : <TheatrePage/> ,
              'AddTheatrePage'    : <AddTheatrePage/> ,
              'EditTheatrePage'   : <EditTheatrePage theatre_id={id}/>,
              'AddTheatreSeatPage': <AddTheatreSeatPage theatre_id={id}/>,
              'LocationTab'       : <LocationPage id={id}/>,
              'EventTimingTab'    : <EventTimingPage id={id}/>,
              'EditEventPage'     : <EditEventPage id={id}/>,
              'SittingType'       : <SittingTypePage/>,
              'SittingList'       : <SittingListPage/>,
              'SittingEdit'       : <SittingEditPage id={id}/>,
              'PageList'          : <PageListPage/>,
              'EditPagePage'      : <EditPagePage id={id}/>,
              'ViedoListPage'     : <ViedoListPage/>, 
              'MembershipListPage': <MembershipListPage/>,
              'MembershipListEditPage':<MembershipListEditPage id={id}/>,
              'EventBookingPage'  : <EventBookingPage/>,
              'TravelBookingPage' : <TravelBookingPage/>,
              'OrderDetailsPage'  : <OrderDetailsPage/>,
              'AddDestinationPage': <AddDestinationPage/>,
              'DestinationListPage':<DestinationListPage/>,
              'DestinationGalleryPage' :<DestinationGalleryPage id={id}/>,
              'EditDestinationPage': <EditDestinationPage id={id}/>,
              'HomeBannerGalleryPage':<HomeBannerGalleryPage/>,
              'UserOrderDetailsPage':<UserOrderDetailsPage id={id}/>,
              'OrderInvoicePage'  :<OrderInvoicePage id={id}/>,
              'TravelOrderInvoicePage':<TravelOrderInvoicePage id={id}/>
              

            }[this.props.component]
          }
          </div>
        );
    };
}
export default DashboardLayout;
