const express = require('express');
const EventPortRouter = express.Router();
var md5 = require('md5');
var sha1 = require('sha1');
var stringify = require('json-stringify');
var formidable = require('formidable');
var fs = require('fs');
var appRoot = require('app-root-path');
const request = require('request-promise');
var urlConstant = require('../module/urlConstant');
const LIST_API_REQUEST 		        = urlConstant.EVENT_LIST_API_REQUEST;
const UPDATE_API_REQUEST            = urlConstant.EVENT_UDPATE_API_POST;
const ADD_API_REQUEST               = urlConstant.EVENT_ADD_API_REQUEST;
const DETAILS_API_REQUEST           = urlConstant.EVENT_DETAILS_API_REQUEST;
const EVENT_BANNER_API_POST         = urlConstant.EVENT_BANNER_API_POST;
const EVENT_DETAILS_API_POST        = urlConstant.EVENT_DETAILS_API_POST;
const EVENT_SAVE_DETAILS_API_POST   = urlConstant.EVENT_SAVE_DETAILS_API_POST;
const EVENT_GET_DETAILS_API_POST    = urlConstant.EVENT_GET_DETAILS_API_POST;
const EVENT_TIMING_UPDATE_API_POST  = urlConstant.EVENT_TIMING_UPDATE_API_POST;
const EVENT_TIMING_DELETE_API_POST  = urlConstant.EVENT_TIMING_DELETE_API_POST;
const EVENT_IMAGE_UPLOAD_API_POST   = urlConstant.EVENT_IMAGE_UPLOAD_API_POST;
const EVENT_BANNER_UPLOAD_API_POST  = urlConstant.EVENT_BANNER_UPLOAD_API_POST;
const EVENT_IAMGE_DELETE_API_POST   = urlConstant.EVENT_IAMGE_DELETE_API_POST;
const EVENT_IAMGE_DEFAULT_API_POST  = urlConstant.EVENT_IAMGE_DEFAULT_API_POST;
const EVENT_IAMGE_STATUS_API_POST   = urlConstant.EVENT_IAMGE_STATUS_API_POST;
const EVENT_FEATURE_IAMGE_STATUS_API_POST = urlConstant.EVENT_FEATURE_IAMGE_STATUS_API_POST;
const EVENT_DELETE_API_POST         = urlConstant.EVENT_DELETE_API_POST;


/**************EVENT List API Start Here**********************************/
EventPortRouter.route('/geteventlist').post(function (req, res,next) {
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
        uri: LIST_API_REQUEST,
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




/**************ADD NEW EVENT API Start Here**********************************/
EventPortRouter.route('/addevent').post(function (req, res,next) {
    var token        	= req.body.token;
    var title        	= req.body.event.title;
    var description     = req.body.event.description;
    var durration       = req.body.event.durration;
    var status          = req.body.event.status;
    var postData ={
        title       : title,
        description : description,
        durration   : durration,
        status      : status,
        token	    : token,
    }
   
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ADD_API_REQUEST,
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


/**************GET EVENT DETAILS API Start Here**********************************/
EventPortRouter.route('/geteventdetails').post(function (req, res,next) {
    var token        	= req.body.token;
    var event_id       = req.body.event_id;
    var postData ={
        token	    : token,
        id          : event_id
    }
    const options = {
            method: 'POST',
            uri: DETAILS_API_REQUEST,
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
EventPortRouter.route('/eventsavebanner').post(function (req, res,next) {
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
EventPortRouter.route('/saveeventdetails').post(function (req, res,next) {
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





/**************GET EVENT DETAILS API Start Here**********************************/
EventPortRouter.route('/geteventlocation').post(function (req, res,next) {
    var token        	= req.body.token;
    var event_id        = req.body.event_id;

    var postData ={
            token	    : token,
            event_id    : event_id,
    }
    const options = {
            method: 'POST',
            uri: EVENT_GET_DETAILS_API_POST,
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





/**************GET EVENT Timing Update API Start Here**********************************/
EventPortRouter.route('/eventtimingupdate').post(function (req, res,next) {
    var token        	= req.body.token;
    var id              = req.body.id;
    var event_id        = req.body.event_detail_id;
    var theater_id      = req.body.theater_id;
    var event_start_time= req.body.event_start_time;
    var event_end_time  = req.body.event_end_time;
    var status          = req.body.status;
    var body            = req.body.body;
    var itinerary       = req.body.itinerary;
    var includes        = req.body.includes;
    var dincludes       = req.body.dincludes;
    var other           = req.body.other;

    var postData ={
            token	        : token,
            id              : id,
            event_id        : event_id,
            theater_id      : theater_id,
            event_start_time: event_start_time,
            event_end_time  : event_end_time,
            status          : status,
            body            : body,
            itinerary       : itinerary,
            includes        : includes,
            dincludes       : dincludes,
            other           : other

    }
    const options = {
            method: 'POST',
            uri: EVENT_TIMING_UPDATE_API_POST,
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





/**************GET EVENT Timing delete API Start Here**********************************/
EventPortRouter.route('/eventtimingdelete').post(function (req, res,next) {
    var token        	= req.body.token;
    var id              = req.body.id;
    var postData ={
            token	        : token,
            id              : id,
    }
    const options = {
            method: 'POST',
            uri: EVENT_TIMING_DELETE_API_POST,
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
EventPortRouter.route('/updateevent').post(function (req, res,next) {
    var token        	= req.body.token;
    var id        	    = req.body.event.id;
    var title        	= req.body.event.title;
    var description     = req.body.event.description;
    var long_description= req.body.event.long_description;
    var durration       = req.body.event.durration;
    var status          = req.body.event.status;
    var is_feature      = req.body.event.is_feature;
    var postData ={
            id          : id,
            title       : title,
            description : description,
            long_description:long_description,
            durration   : durration,
            status      : status,
            is_feature  : is_feature,
            token	    : token,
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    console.log('======================Post Data=========================');
    const options = {
        method: 'POST',
        uri: UPDATE_API_REQUEST,
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
	    //console.log(err)
	})
});





/**************ADD NEW EVENT API Start Here**********************************/
EventPortRouter.route('/uploadimage').post(function (req, res,next) {
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
        uri: EVENT_IMAGE_UPLOAD_API_POST,
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
EventPortRouter.route('/eventbannerupload').post(function (req, res,next) {
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
EventPortRouter.route('/deleteeventimage').post(function (req, res,next) {
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
        uri: EVENT_IAMGE_DELETE_API_POST,
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
EventPortRouter.route('/defaulteventimage').post(function (req, res,next) {
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
        uri: EVENT_IAMGE_DEFAULT_API_POST,
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
EventPortRouter.route('/updateeventfeaturestatusimage').post(function (req, res,next) {
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
        uri: EVENT_FEATURE_IAMGE_STATUS_API_POST,
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
EventPortRouter.route('/updateeventstatusimage').post(function (req, res,next) {
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
EventPortRouter.route('/deleteevent').post(function (req, res,next) {
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
        uri: EVENT_DELETE_API_POST,
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













module.exports = EventPortRouter;
