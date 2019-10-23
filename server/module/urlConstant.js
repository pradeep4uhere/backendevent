var config = require('./config');
var urlConstant;
urlConstant = {
        GENERAL_SETTING_URL			        :   config.API_HOST_URL+'/getsetting',
        GENERAL_SETTING_UPDATE_URL	        :   config.API_HOST_URL+'/settingupdate',
        GET_CITY_LIST_URL	                :   config.API_HOST_URL+'/getcitilist',
        
		REGISTER_API_REQUEST	            : 	config.API_HOST_URL+'/register',
        LOGIN_API_REQUEST		            : 	config.API_HOST_URL+'/login',
        
        USER_LIST_API_REQUEST	            : 	config.API_HOST_URL+'/getuserlist',
        USER_UPDATE_API_REQUEST	            : 	config.API_HOST_URL+'/updateuser',
        USER_ORDER_LIST_REQUEST             :   config.API_HOST_URL+'/usereventorderlist',
        USER_ORDER_DETAILS_REQUEST          :   config.API_HOST_URL+'/usereventorderdetails',
        
        EVENT_LIST_API_REQUEST	            : 	config.API_HOST_URL+'/geteventlist',
        EVENT_ADD_API_REQUEST               : 	config.API_HOST_URL+'/addevent',
        EVENT_UDPATE_API_POST               : 	config.API_HOST_URL+'/updateevent',

        EVENT_UPDATE_API_REQUEST            : 	config.API_HOST_URL+'/geteventlist',
        EVENT_DETAILS_API_REQUEST           : 	config.API_HOST_URL+'/geteventdetails',
        EVENT_BANNER_API_REQUEST            : 	config.API_HOST_URL+'/eventbanner',
        EVENT_BANNER_API_POST               : 	config.API_HOST_URL+'/saveeventbanner',
        EVENT_SAVE_DETAILS_API_POST         : 	config.API_HOST_URL+'/saveeventdetails',
        EVENT_GET_DETAILS_API_POST          : 	config.API_HOST_URL+'/geteventlocation',
        EVENT_TIMING_UPDATE_API_POST        : 	config.API_HOST_URL+'/updateeventtiming',
        EVENT_TIMING_DELETE_API_POST        :   config.API_HOST_URL+'/deleteeventtiming',
        EVENT_IMAGE_UPLOAD_API_POST         :   config.API_HOST_URL+'/imageupload',
        EVENT_BANNER_UPLOAD_API_POST        :   config.API_HOST_URL+'/eventbannerupload',
        EVENT_IAMGE_DELETE_API_POST         :   config.API_HOST_URL+'/eventimagedelete',
        EVENT_IAMGE_DEFAULT_API_POST        :   config.API_HOST_URL+'/eventimagedefault',
        EVENT_IAMGE_STATUS_API_POST         :   config.API_HOST_URL+'/updateeventstatusimage',
        EVENT_DELETE_API_POST               :   config.API_HOST_URL+'/deleteevent',
        



        BANNER_IMAGE_UPLOAD_API_POST        :   config.API_HOST_URL+'/bannerimageupload',
        BANNER_IAMGE_DELETE_API_POST        :   config.API_HOST_URL+'/bannerimagedelete',
        BANNER_IAMGE_DEFAULT_API_POST       :   config.API_HOST_URL+'/bannerimagedefault',
        BANNER_IAMGE_STATUS_API_POST        :   config.API_HOST_URL+'/updatebannerstatusimage',

        
        ITINERARIES_GET_URL			        :   config.API_HOST_URL+'/getitinerary',	
        ITINERARIES_ADD_URL			        :   config.API_HOST_URL+'/additinerary',	
        ITINERARIES_ALL_LIST_URL            :   config.API_HOST_URL+'/allitinerary',
        ITINERARIES_IMAGE_UPLOAD            :   config.API_HOST_URL+'/itineraryimageupload',	
        ITINERARIES_IAMGE_DEFAULT_API_POST  :   config.API_HOST_URL+'/itineraryimagedefault',
        ITINERARIES_IAMGE_DELETE_API_POST   :   config.API_HOST_URL+'/itineraryimagedelete',
        ITINERARIES_DEPARTURE_API_REQUEST   :   config.API_HOST_URL+'/itinerarydeparture',
        ITINERARIES_DEPARTURE_DELETE        :   config.API_HOST_URL+'/departuredelete',
        ITINERARIES_DELETE                  :   config.API_HOST_URL+'/itinerarydelete',
        
        
        

        THEATRE_GET_LIST                    :   config.API_HOST_URL+'/gettheatrelist',
        THEATRE_ADD_POST                    :   config.API_HOST_URL+'/addtheatre',
        THEATRE_GET_POST                    :   config.API_HOST_URL+'/gettheatre',
        THEATRE_UPDATE_POST                 :   config.API_HOST_URL+'/updatetheatre',
        THEATRE_UPDATE_SEAT                 :   config.API_HOST_URL+'/updatetheatreseat',
        GET_THEATHRE_API_POST               :   config.API_HOST_URL+'/gettheatrebyid',

        ADD_SEAT_API                        :   config.API_HOST_URL+'/addseat',
        GET_SEAT_API                        :   config.API_HOST_URL+'/getseattinglist',
        UPDATE_SEAT_API                     :   config.API_HOST_URL+'/updateseat',

        GET_PAGE_LIST_API                   :   config.API_HOST_URL+'/getpagelist',
        GET_PAGE_DETAIL_API                 :   config.API_HOST_URL+'/getpagedetails',
        UPDATE_PAGE_DETAIL_API              :   config.API_HOST_URL+'/pagedetailupdate',

        UPDATE_VIEDO_API                    :   config.API_HOST_URL+'/updateviedos',
        GET_VIEDO_API                       :   config.API_HOST_URL+'/getviedos',
        DELETE_VIEDO_API                    :   config.API_HOST_URL+'/deleteviedos',

        MEMBERSHIP_PLAN_LIST_API            :   config.API_HOST_URL+'/getmembership',
        DASHBOARD_DATA                      :   config.API_HOST_URL+'/getalldashboard',

        ADD_DESTINATION_URL                 :   config.API_HOST_URL+'/adddestination',
        ALL_DESTINATION_URL                 :   config.API_HOST_URL+'/alldestination', 
        DESTINATION_IMAGE_UPLOAD_POST       :   config.API_HOST_URL+'/destinationimageupload',
        DESTINATION_DELETE_POST             :   config.API_HOST_URL+'/destinationdelete',
        DESTINATION_DETAILS_POST            :   config.API_HOST_URL+'/getdestination',
        UPDATE_DESTINATION_DETAILS_POST     :   config.API_HOST_URL+'/updatedestination',
        DESTINATION_IAMGE_DELETE_API_POST   :   config.API_HOST_URL+'/destinationimagedelete',
        DESTINATION_IAMGE_DEFAULT_API_POST  :   config.API_HOST_URL+'/destinationimagedefault',
        DESTINATION_IAMGE_STATUS_API_POST   :   config.API_HOST_URL+'/updatedestinationstatusimage',
}
module.exports = urlConstant;
