export const AppUrl = 'http://192.168.0.127:4209'
export const Constants = {
	APP_NAME					: 'Rudra',
    APP_TAG	    				: 'XP',
	APP_SALT					: 'MdtKyGbnrGT3wzxgkCPRO+wwfBGrlhMwGuOHX6xyFE0=',
	APP_FRONT					: 'http://192.168.0.181:5000/',
	GENERAL_SETTING_URL			: AppUrl+'/general/setting',	
	USER_TYPE_GET				: AppUrl+'/general/userdetailsview',	
	GENERAL_SETTING_UPDATE_URL	: AppUrl+'/general/settingupdate',	
	
	//All API URL GOES HERE
	LOGIN_URL					: AppUrl+'/serverport/login',	
	REGISTER_URL				: AppUrl+'/serverport/register',	
	
	USER_LIST_URL				: AppUrl+'/userport/getuserlist',	
	USER_UPDATE_URL				: AppUrl+'/userport/updateuser',	
	USER_EVENT_ORDER_LSIT_URL	: AppUrl+'/userport/usereventorderlist',	
	GET_USER_ORDER_DETAILS_URL	: AppUrl+'/userport/userorderdetails',	
	GET_TRAVEL_ORDER_DETAILS_URL: AppUrl+'/userport/travelorderdetails',	

	GET_CITY_LIST_URL			: AppUrl+'/general/getcitylist',	

	DESTINATION_ADD_URL			: AppUrl+'/destination/adddestination',	
	DESTINATION_ALL_URL			: AppUrl+'/destination/alldestination',	 
	DESTINATION_IMAGE_UPLOAD	: AppUrl+'/destination/uploadimage',   
	DESTINATION_DELETE_URL		: AppUrl+'/destination/deletedestination',   
	DESTINATION_DETAILS_URL		: AppUrl+'/destination/getdestination', 
	DESTINATION_UPDATE_URL		: AppUrl+'/destination/updatedestination',	
	DESTINATION_DELETE_IMAGE_API: AppUrl+'/destination/deletedestinationimage', 
	DESTINATION_DEFAULT_IMAGE_API: AppUrl+'/destination/defaultdestinationimage', 
	DESTINATION_STATUS_IMAGE_API: AppUrl+'/destination/updatedestinationstatusimage',   

	ITINERARIES_URL				: AppUrl+'/itineraries/getitinerary',	   
	ITINERARIES_ADD_URL			: AppUrl+'/itineraries/additinerary',	    
	ITINERARY_UPDATE_URL		: AppUrl+'/itineraries/updatetinerary',	  
	ITINERARIES_ADDON_UPDATE_URL: AppUrl+'/itineraries/updatetineraryaddon',	    
	ITINERARIES_LIST_URL		: AppUrl+'/itineraries/allitinerary',	 
	ITINERARIES_IMAGE_UPLOAD	: AppUrl+'/itineraries/uploadimage',   
	ITINERARIES_DEFAULT_IMAGE_API: AppUrl+'/itineraries/defaultimage', 
	ITINERARIES_DELETE_IMAGE_API : AppUrl+'/itineraries/deleteitinerariesimage', 
	ITINERARIES_UPDATE_URL		: AppUrl+'/itineraries/itinerariesdepartureupdate', 
	ITINERARy_DEPARTURE_DELETE_URL: AppUrl+'/itineraries/departuredelete', 
	ITINERARIES_ADDON_DELETE_URL: AppUrl+'/itineraries/addondelete', 
	ITINERARY_DELETE_API		: AppUrl+'/itineraries/itinerariesdelete', 
	ITINERARIES_DAYS_LIST_URL	: AppUrl+'/itineraries/allitinerarydays',	 
	ITINERARIES_ADD_DAYS_URL	: AppUrl+'/itineraries/additinerarydays',	
	ITINERARY_DAY_UPDATE_URL	: AppUrl+'/itineraries/updateitinerarydays',	
	ITINERARIES_DAY_URL			: AppUrl+'/itineraries/getitineraryday',	
	ITINERARY_DAY_DELETE_API	: AppUrl+'/itineraries/deleteItinerarydays',
	ITINERARIES_DAY_IMAGE_UPLOAD: AppUrl+'/itineraries/uploaddayimage',   
	ITINERARIES_DAY_DEFAULT_IMAGE_API: AppUrl+'/itineraries/defaultdayimage', 
	ITINERARIES_DELETE_DAY_IMAGE_API: AppUrl+'/itineraries/itinerarydayimagedelete', 
	
	EVENT_LIST_URL				: AppUrl+'/eventport/geteventlist',	    
	EVENT_ADD_URL				: AppUrl+'/eventport/addevent',	    
	EVENT_UPDATE_URL			: AppUrl+'/eventport/updateevent',	    
	EVENT_DETAILS_URL			: AppUrl+'/eventport/geteventdetails',	
	EVENT_SAVE_BANNER_API_POST  : AppUrl+'/eventport/eventsavebanner',    
	EVENT_SAVE_DETAILS_API_POST : AppUrl+'/eventport/saveeventdetails',    
	EVENT_GET_DETAILS_API_POST 	: AppUrl+'/eventport/geteventlocation', 
	EVENT_DELETE_IMAGE_API		: AppUrl+'/eventport/deleteeventimage', 
	EVENT_DEFAULT_IMAGE_API		: AppUrl+'/eventport/defaulteventimage', 
	EVENT_STATUS_IMAGE_API		: AppUrl+'/eventport/updateeventstatusimage', 
	EVENT_STATUS_FEATURE_IMAGE_API: AppUrl+'/eventport/updateeventfeaturestatusimage', 
	EVENT_DELETE_API			: AppUrl+'/eventport/deleteevent', 

	BANNER_IMAGE_UPLOAD			: AppUrl+'/general/banneruploadimage',
	BANNER_DELETE_IMAGE_API		: AppUrl+'/general/deletebannerimage', 
	BANNER_DEFAULT_IMAGE_API	: AppUrl+'/general/defaultbannerimage', 
	BANNER_STATUS_IMAGE_API		: AppUrl+'/general/updatebannerstatusimage', 
	

	EVENT_TIME_UPDATE_URL		: AppUrl+'/eventport/eventtimingupdate', 	
	EVENT_TIME_DELETE_URL		: AppUrl+'/eventport/eventtimingdelete', 	
	
	THEATRE_LIST_URL			: AppUrl+'/theatreport/gettheatrelist',	    
	THEATRE_ADD_URL				: AppUrl+'/theatreport/addtheatre',	    
	THEATRE_GET_URL				: AppUrl+'/theatreport/gettheatre',
	THEATRE_URL					: AppUrl+'/theatreport/gettheatrebyid',
	THEATRE_UPDATE_URL			: AppUrl+'/theatreport/updatetheatre',
	THEATRE_DELETE_LIST_URL		: AppUrl+'/theatreport/deletetheatre',
	
	IMAGE_UPLOAD				: AppUrl+'/eventport/uploadimage',
	EVENT_BANNER_IMAGE_UPLOAD	: AppUrl+'/eventport/eventbannerupload',

	SEATING_TYPE_ADD			: AppUrl+'/general/addseating',
	SEATING_TYPE_LIST			: AppUrl+'/general/getseatinglist',
	SEATING_TYPE_GET			: AppUrl+'/general/getseattype',
	SEATING_TYPE_UPDATE			: AppUrl+'/general/updateseat',

	PAGE_LIST_URL				: AppUrl+'/general/getpagelist',	 
	PAGE_DETAIL_URL				: AppUrl+'/general/getpagedetail',	 
	PAGE_UPDATE_URL				: AppUrl+'/general/pagedetailupdate',	 


	ADD_SEAT_THEATRE			: AppUrl+'/theatreport/addseattheatre',

	VIEDO_LIST_URL				: AppUrl+'/general/getviedos',	    
	VIEDO_UPDATE_URL			: AppUrl+'/general/viedoupdate',
	VIEDO_DELETE_URL			: AppUrl+'/general/deleteviedo'	,    

	MEMBERSHIP_PLAN_LIST		: AppUrl+'/general/membershipplanlist'	,  
	MEMBERSHIP_PLAN_UPDATE_URL	: AppUrl+'/general/membershipplanupdate',
	MEMBERSHIP_PLAN_DELETE_URL	: AppUrl+'/general/membershipplandelete',
	MEMBERSHIP_PLAN_PRICE_UPDATE_URL	: AppUrl+'/general/membershipplanpriceupdate',
	TAX_LIST					: AppUrl+'/general/getalltax',
	TAXTYPE_UPDATE_URL			: AppUrl+'/general/updategetalltax',
	TAXTYPE_DELETE_URL			: AppUrl+'/general/deletetaxtype',

	OFFER_LIST					: AppUrl+'/general/getallofferlist',
	OFFER_UPDATE_URL			: AppUrl+'/general/updategetalloffer',
	OFFER_DELETE_URL			: AppUrl+'/general/deleteoffer',

	DASHBOARD_DATA				: AppUrl+'/general/getalldashboard'	,  
	TRAVELL_BOOKING_DATA		: AppUrl+'/general/travellorderdata'	,   



    IMG							: {
    								USER_PROFILE: '../theme/dist/img/user2-160x160.jpg',	
    			  				  }
};
export default Constants
