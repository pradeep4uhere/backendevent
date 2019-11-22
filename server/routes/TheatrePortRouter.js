const express = require('express');
const TheatrePortRouter = express.Router();
var md5 = require('md5');
var sha1 = require('sha1');
var stringify = require('json-stringify');
var formidable = require('formidable');
var fs = require('fs');
var appRoot = require('app-root-path');
const request = require('request-promise');
var urlConstant = require('../module/urlConstant');
const LIST_API_REQUEST 		        = urlConstant.THEATRE_GET_LIST;
const ADD_API_POST   		        = urlConstant.THEATRE_ADD_POST;
const GET_API_POST   		        = urlConstant.THEATRE_GET_POST;
const UPDATE_POST                   = urlConstant.THEATRE_UPDATE_POST;
const THEATRE_UPDATE_SEAT           = urlConstant.THEATRE_UPDATE_SEAT;
const GET_THEATHRE_API_POST         = urlConstant.GET_THEATHRE_API_POST;
const GET_THEATHRE_DELETE_API_POST  = urlConstant.THEATHRE_DELETE_API_POST;




/**************EVENT List API Start Here**********************************/
TheatrePortRouter.route('/gettheatrelist').post(function (req, res,next) {
    var token        	= req.body.token;
    var urlParams       = req.body.urlParams;
    var postData ={
        token	    : token,
        urlParams   : urlParams
    }
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




TheatrePortRouter.route('/addtheatre').post(function (req, res,next) {
    var token        	= req.body.token;
    var title        	= req.body.title;
    var company_name   	= req.body.company_name;
    var contact_number 	= req.body.contact_number;
    var email_address  	= req.body.email_address;
    var country        	= req.body.country;
    var state          	= req.body.state;
    var city           	= req.body.city;
    var address        	= req.body.address;
    var zipcode        	= req.body.zipcode;
    var status         	= req.body.status;

    var postData ={
        token	        : token,
        title	        : title,
        company_name    : company_name,
        contact_number	: contact_number,
        email_address   : email_address,
        country	        : country,
        state	        : state,
        city	        : city,
        address	        : address,
        zipcode	        : zipcode,
        status	        : status,
        
    }
    const options = {
        method: 'POST',
        uri: ADD_API_POST,
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



TheatrePortRouter.route('/gettheatre').post(function (req, res,next) {
    var token        	= req.body.token;
    var id        	= req.body.id;

    var postData ={
        token   : token,
        id      : id, 
    }
    const options = {
        method: 'POST',
        uri: GET_API_POST,
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



TheatrePortRouter.route('/gettheatrebyid').post(function (req, res,next) {
    var token      	= req.body.token;
    var id        	= req.body.id;

    var postData ={
        token   : token,
        id      : id, 
    }
    const options = {
        method: 'POST',
        uri: GET_THEATHRE_API_POST,
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




TheatrePortRouter.route('/deletetheatre').post(function (req, res,next) {
    var token      	= req.body.token;
    var id        	= req.body.id;

    var postData ={
        token   : token,
        id      : id, 
    }
    const options = {
        method: 'POST',
        uri: GET_THEATHRE_DELETE_API_POST,
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






TheatrePortRouter.route('/updatetheatre').post(function (req, res,next) {
    var token        	= req.body.token;
    var id        	= req.body.id;
    var title        	= req.body.title;
    var company_name   	= req.body.company_name;
    var contact_number 	= req.body.contact_number;
    var email_address  	= req.body.email_address;
    var country        	= req.body.country;
    var state          	= req.body.state;
    var city           	= req.body.city;
    var address        	= req.body.address;
    var zipcode        	= req.body.zipcode;
    var status         	= req.body.status;

    var postData ={
        token	        : token,
        id	        : id,
        title	        : title,
        company_name    : company_name,
        contact_number	: contact_number,
        email_address   : email_address,
        country	        : country,
        state	        : state,
        city	        : city,
        address	        : address,
        zipcode	        : zipcode,
        status	        : status,
        
    }
    const options = {
        method: 'POST',
        uri: UPDATE_POST,
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





TheatrePortRouter.route('/addseattheatre').post(function (req, res,next) {
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var row         	= req.body.row;
    var col            	= req.body.col;
    var seat         	= req.body.seat;
    var sitting_type_id	= req.body.sitting_type_id;

    var postData ={
        token	        : token,
        id	            : id,
        row	            : row,
        col             : col,
        seat	        : seat,
        sitting_type_id : sitting_type_id
    }
    const options = {
        method: 'POST',
        uri: THEATRE_UPDATE_SEAT,
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












module.exports = TheatrePortRouter;
