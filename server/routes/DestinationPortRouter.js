const express = require('express');
const GeneralPortRouter = express.Router();
var md5 = require('md5');
var sha1 = require('sha1');
var stringify = require('json-stringify');
var formidable = require('formidable');
var fs = require('fs');
var appRoot = require('app-root-path');
const request = require('request-promise');
var urlConstant = require('../module/urlConstant');
const DESTINATION_ADD_URL           = urlConstant.ADD_DESTINATION_URL;
const DESTINATION_ALL_URL           = urlConstant.ALL_DESTINATION_URL;
const DESTINATION_IMAGE_UPLOAD_POST = urlConstant.DESTINATION_IMAGE_UPLOAD_POST;
const DESTINATION_DELETE_POST       = urlConstant.DESTINATION_DELETE_POST;
const UPDATE_DESTINATION_DETAILS_POST = urlConstant.UPDATE_DESTINATION_DETAILS_POST;
const DESTINATION_DETAILS_POST      = urlConstant.DESTINATION_DETAILS_POST;

const DESTINATION_IAMGE_DELETE_API_POST   = urlConstant.DESTINATION_IAMGE_DELETE_API_POST;
const DESTINATION_IAMGE_DEFAULT_API_POST  = urlConstant.DESTINATION_IAMGE_DEFAULT_API_POST;
const DESTINATION_IAMGE_STATUS_API_POST   = urlConstant.DESTINATION_IAMGE_STATUS_API_POST;


/**************Get General Setting List API Start Here*****************************/
GeneralPortRouter.route('/alldestination').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
        token	    : token,
    }
    const options = {
        method: 'POST',
        uri: DESTINATION_ALL_URL,
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
/**************Get General Setting List API Start Here*****************************/


/**************EVENT List API Start Here**********************************/
GeneralPortRouter.route('/adddestination').post(function (req, res,next) {
    var token       = req.body.token;
    var title       = req.body.title;
    var description = req.body.description;
    var altitude    = req.body.altitude;
    var climate     = req.body.climate;
    var population  = req.body.population;
    var shopping    = req.body.shopping;
    var cuisine     = req.body.cuisine;
    var more        = req.body.more;
    var status      = req.body.status;
    var trip_type   = req.body.trip_type;

    var postData ={
        token	    : token,
        title       : title,
        description : description,
        altitude    : altitude,
        climate     : climate,
        population  : population,
        shopping    : shopping,
        more        : more,
        cuisine     : cuisine,
        trip_type   : trip_type,
        status      : status
    }
    const options = {
        method: 'POST',
        uri: DESTINATION_ADD_URL,
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
GeneralPortRouter.route('/uploadimage').post(function (req, res,next) {
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
        uri: DESTINATION_IMAGE_UPLOAD_POST,
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
GeneralPortRouter.route('/deletedestination').post(function (req, res,next) {
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
        uri: DESTINATION_DELETE_POST,
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
GeneralPortRouter.route('/getdestination').post(function (req, res,next) {
    console.log(req.body);    
    var token       = req.body.token;
    var id        	= req.body.id;
    var postData ={
            id          : id,
            token	    : token,
    }
    console.log('======================Post Data=========================');
    console.log(postData);
    const options = {
        method: 'POST',
        uri: DESTINATION_DETAILS_POST,
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
GeneralPortRouter.route('/updatedestination').post(function (req, res,next) {
        
    var token       = req.body.token;
    var id        	= req.body.id;
    var title       = req.body.title;
    var description = req.body.description;
    var altitude    = req.body.altitude;
    var climate     = req.body.climate;
    var population  = req.body.population;
    var shopping    = req.body.shopping;
    var cuisine     = req.body.cuisine;
    var more        = req.body.more;
    var trip_type   = req.body.trip_type;
    var status      = req.body.status;

    var postData ={
            id          : id,
            title       : title,
            description : description,
            altitude    : altitude,
            climate     : climate,
            population  : population,
            shopping    : shopping,
            more        : more,
            cuisine     : cuisine,
            trip_type   : trip_type,
            status      : status,
            token	    : token,
    }
    //console.log('======================Post Data=========================');
    //console.log(postData);
    const options = {
        method: 'POST',
        uri: UPDATE_DESTINATION_DETAILS_POST,
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
GeneralPortRouter.route('/deletedestinationimage').post(function (req, res,next) {
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
        uri: DESTINATION_IAMGE_DELETE_API_POST,
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
GeneralPortRouter.route('/defaultdestinationimage').post(function (req, res,next) {
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
        uri: DESTINATION_IAMGE_DEFAULT_API_POST,
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
GeneralPortRouter.route('/updatedestinationstatusimage').post(function (req, res,next) {
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
        uri: DESTINATION_IAMGE_STATUS_API_POST,
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







































module.exports = GeneralPortRouter;
