const express = require('express');
const ItinerariesPortRouter = express.Router();
var md5 = require('md5');
var sha1 = require('sha1');
var stringify = require('json-stringify');
var formidable = require('formidable');
var fs = require('fs');
var appRoot = require('app-root-path');
const request = require('request-promise');
var urlConstant = require('../module/urlConstant');
const EVENT_BANNER_API_POST         = urlConstant.EVENT_BANNER_API_POST;
const EVENT_SAVE_DETAILS_API_POST   = urlConstant.EVENT_SAVE_DETAILS_API_POST;
const EVENT_BANNER_UPLOAD_API_POST  = urlConstant.EVENT_BANNER_UPLOAD_API_POST;

const EVENT_IAMGE_STATUS_API_POST   = urlConstant.EVENT_IAMGE_STATUS_API_POST;
 
const ITINERARIES_GET_URL           = urlConstant.ITINERARIES_GET_URL;
const ITINERARIES_ADD_URL           = urlConstant.ITINERARIES_ADD_URL;
const ITINERARIES_LIST_URL	        = urlConstant.ITINERARIES_ALL_LIST_URL;
const ITINERARIES_IMAGE_UPLOAD      = urlConstant.ITINERARIES_IMAGE_UPLOAD;
const ITINERARIES_IAMGE_DEFAULT_API_POST  = urlConstant.ITINERARIES_IAMGE_DEFAULT_API_POST;
const ITINERARIES_IAMGE_DELETE_API_POST   = urlConstant.ITINERARIES_IAMGE_DELETE_API_POST;
const ITINERARIES_DEPARTURE_API_REQUEST   = urlConstant.ITINERARIES_DEPARTURE_API_REQUEST;
const ITINERARIES_DEPARTURE_DELETE        = urlConstant.ITINERARIES_DEPARTURE_DELETE;
const ITINERARIES_DELETE            =   urlConstant.ITINERARIES_DELETE;
const ITINERARIES_DAYS_GET_URL      =   urlConstant.ITINERARIES_DAYS_GET_URL;
const ITINERARIES_DAY_ADD_URL       =   urlConstant.ITINERARIES_DAY_ADD_URL;
const ITINERARIES_DAY_DELETE        =   urlConstant.ITINERARIES_DAY_DELETE;






/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/additinerary').post(function (req, res,next) {
    var token        	= req.body.token;
    var title        	= req.body.event.title;
    var description     = req.body.event.description;
    var addon           = req.body.event.addon;
    var status          = req.body.event.status;
    var postData ={
        title       : title,
        description : description,
        addon       : addon,
        status      : status,
        token	    : token,
    }
   
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_ADD_URL,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});




/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/additinerarydays').post(function (req, res,next) {
    var token        	= req.body.token;
    var day        	    = req.body.event.day;
    var place_name      = req.body.event.place_name;
    var details         = req.body.event.details;
    var status          = req.body.event.status;
    var itinerary_id    = req.body.event.itinerary_id;
    var postData ={
        day         : day,
        place_name  : place_name,
        details     : details,
        status      : status,
        itinerary_id: itinerary_id,
        token	    : token,
    }
   
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_DAY_ADD_URL,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});








/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/updatetinerary').post(function (req, res,next) {
    var token        	= req.body.token;
    var title        	= req.body.event.title;
    var description     = req.body.event.description;
    var addon           = req.body.event.addon;
    var status          = req.body.event.status;
    var id          = req.body.event.id;
    var postData ={
        id          : id,
        title       : title,
        description : description,
        addon       : addon,
        status      : status,
        token	    : token,
    }
   
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_ADD_URL,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});




/**************EVENT API Ends Here************************************************/






/**************EVENT List API Start Here**********************************/
ItinerariesPortRouter.route('/allitinerary').post(function (req, res,next) {
    var token        	= req.body.token;
    var urlParams       = req.body.urlParams;
    var postData ={
        token	    : token,
        urlParams   : urlParams
    }
    //console.log(postData);
    //console.log('-----------------------'+urlParams+'------------------------------');
    if(postData.urlParams!=''){
        if(postData.urlParams!=null){
            LIST_API_REQUEST = urlParams;
        }
    }
    const options = {
        method: 'POST',
        uri: ITINERARIES_LIST_URL,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    
    console.log(postData);
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});



/**************GET EVENT DETAILS API Start Here**********************************/
ItinerariesPortRouter.route('/allitinerarydays').post(function (req, res,next) {
    var token        	= req.body.token;
    var event_id       = req.body.event_id;
    var postData ={
        token	    : token,
        id          : event_id
    }
    const options = {
            method: 'POST',
            uri: ITINERARIES_DAYS_GET_URL,
            body: postData,
            json: true,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
    }
    console.log('========================================================');
    console.log('======================Post Data=========================');
    console.log(options);
    console.log('========================================================');
    
    request(options)
	    .then(function (response) {
            console.log('========================================================');
            console.log('===================Response Data========================');
            console.log(response)
            console.log('========================================================');
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});




/**************GET EVENT DETAILS API Start Here**********************************/
ItinerariesPortRouter.route('/getitinerary').post(function (req, res,next) {
    var token        	= req.body.token;
    var event_id       = req.body.event_id;
    var postData ={
        token	    : token,
        id          : event_id
    }
    const options = {
            method: 'POST',
            uri: ITINERARIES_GET_URL,
            body: postData,
            json: true,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
    }
    console.log('========================================================');
    console.log('======================Post Data=========================');
    console.log(options);
    console.log('========================================================');
    
    request(options)
	    .then(function (response) {
            console.log('========================================================');
            console.log('===================Response Data========================');
            console.log(response)
            console.log('========================================================');
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});


/**************GET EVENT DETAILS API Start Here**********************************/
ItinerariesPortRouter.route('/eventsavebanner').post(function (req, res,next) {
    var token        	= req.body.token;
    var event_id       = req.body.event_id;
    var postData ={
        token	    : token,
        id          : event_id
    }
    const options = {
            method: 'POST',
            uri: EVENT_BANNER_API_POST,
            body: postData,
            json: true,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
    }
    console.log('========================================================');
    console.log('======================Post Data=========================');
    console.log(options);
    console.log('========================================================');
    
    request(options)
	    .then(function (response) {
            console.log('========================================================');
            console.log('===================Response Data========================');
            console.log(response)
            console.log('========================================================');
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});




/**************GET EVENT DETAILS API Start Here**********************************/
ItinerariesPortRouter.route('/saveeventdetails').post(function (req, res,next) {
    var token        	= req.body.token;
    var event_id        = req.body.event_id;
    var language        = req.body.language;
    var country         = req.body.country;
    var state           = req.body.state;
    var city            = req.body.city;

    var postData ={
            token	    : token,
            event_id    : event_id,
            language    : language,
            country     : country,
            state       : state,
            city        : city,
    }
    const options = {
            method: 'POST',
            uri: EVENT_SAVE_DETAILS_API_POST,
            body: postData,
            json: true,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
    }
    console.log('======================Post Data=========================');
    console.log(options);
    
    request(options)
	    .then(function (response) {
            console.log('===================Response Data========================');
            console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});





/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/itinerariesdepartureupdate').post(function (req, res) {
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var itinerary_id    = req.body.itinerary_id;
    var price        	= req.body.price;
    var start_date      = req.body.start_date;
    var end_date        = req.body.end_date;
    var status          = req.body.status;
    var postData ={
            id              : id,
            price           : price,
            start_date      : start_date,
            end_date        : end_date,
            status          : status,
            itinerary_id    : itinerary_id,
            token	        : token,
    }
    const options = {
        method: 'POST',
        uri: ITINERARIES_DEPARTURE_API_REQUEST,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    console.log('======================Post Data=========================');
    console.log(options);
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    //console.log(err)
	})
});





/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/uploadimage').post(function (req, res,next) {
    console.log(req.body);    
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var imageStr   	    = req.body.imageStr;
    var postData ={
            id          : id,
            token	    : token,
            imageStr    : imageStr
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_IMAGE_UPLOAD,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    console.log(err)
	})
});







/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/eventbannerupload').post(function (req, res,next) {
    console.log(req.body);    
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var imageStr   	    = req.body.imageStr;
    var postData ={
            id          : id,
            token	    : token,
            imageStr    : imageStr
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: EVENT_BANNER_UPLOAD_API_POST,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    console.log(err)
	})
});



/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/deleteitinerariesimage').post(function (req, res,next) {
    console.log(req.body);    
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var postData ={
            id          : id,
            token	    : token,
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_IAMGE_DELETE_API_POST,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    console.log(err)
	})
});


/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/defaultimage').post(function (req, res,next) {
    console.log(req.body);    
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var postData ={
            id          : id,
            token	    : token,
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_IAMGE_DEFAULT_API_POST,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    console.log(err)
	})
});




/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/updateeventstatusimage').post(function (req, res,next) {
    console.log(req.body);    
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var postData ={
            id          : id,
            token	    : token,
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: EVENT_IAMGE_STATUS_API_POST,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    console.log(err)
	})
});








/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/departuredelete').post(function (req, res,next) {
    console.log(req.body);    
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var postData ={
            id          : id,
            token	    : token,
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_DEPARTURE_DELETE,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    console.log(err)
	})
});



ItinerariesPortRouter.route('/deleteItinerarydays').post(function (req, res,next) {
    console.log(req.body);    
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var postData ={
            id          : id,
            token	    : token,
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_DAY_DELETE,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    console.log(err)
	})
});




/**************ADD NEW EVENT API Start Here**********************************/
ItinerariesPortRouter.route('/itinerariesdelete').post(function (req, res,next) {
    console.log(req.body);    
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var postData ={
            id          : id,
            token	    : token,
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ITINERARIES_DELETE,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	    console.log(err)
	})
});


module.exports = ItinerariesPortRouter;
