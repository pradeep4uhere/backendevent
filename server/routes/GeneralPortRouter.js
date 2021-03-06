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
const GENERAL_SETTING_URL       = urlConstant.GENERAL_SETTING_URL;
const GENERAL_SETTING_UPDATE_URL= urlConstant.GENERAL_SETTING_UPDATE_URL;

const ADD_SEAT_API              = urlConstant.ADD_SEAT_API;
const GET_SEAT_API              = urlConstant.GET_SEAT_API;
const UPDATE_SEAT_API           = urlConstant.UPDATE_SEAT_API;
const GET_PAGE_LIST_API         = urlConstant.GET_PAGE_LIST_API;
const GET_PAGE_DETAIL_API       = urlConstant.GET_PAGE_DETAIL_API;
const UPDATE_PAGE_DETAIL_API    = urlConstant.UPDATE_PAGE_DETAIL_API;

const UPDATE_VIEDO_API          = urlConstant.UPDATE_VIEDO_API;
const GET_VIEDO_API             = urlConstant.GET_VIEDO_API;
const DELETE_VIEDO_API          = urlConstant.DELETE_VIEDO_API;
const MEMBERSHIP_PLAN_LIST_API  = urlConstant.MEMBERSHIP_PLAN_LIST_API;
const MEMBERSHIP_PLAN_UPDATE_API= urlConstant.MEMBERSHIP_PLAN_UPDATE_API;
const MEMBERSHIP_PLAN_DELETE_API= urlConstant.MEMBERSHIP_PLAN_DELETE_API;
const MEMBERSHIP_PLAN_PRICE_UPDATE_API =  urlConstant.MEMBERSHIP_PLAN_PRICE_UPDATE_API;

const DASHBOARD_DATA            = urlConstant.DASHBOARD_DATA;


const BANNER_IMAGE_UPLOAD_API_POST   = urlConstant.BANNER_IMAGE_UPLOAD_API_POST;
const BANNER_IAMGE_DELETE_API_POST   = urlConstant.BANNER_IAMGE_DELETE_API_POST;
const BANNER_IAMGE_DEFAULT_API_POST  = urlConstant.BANNER_IAMGE_DEFAULT_API_POST;
const BANNER_IAMGE_STATUS_API_POST   = urlConstant.BANNER_IAMGE_STATUS_API_POST;
const GET_TRAVEL_ORDER_LIST		     = urlConstant.GET_TRAVEL_ORDER_URL;
const GET_TAX_API                    = urlConstant.GET_TAX_URL;
const GET_TAX_TYPE_UPDATE_API        = urlConstant.GET_TAX_TYPE_UPDATE_API;
const DELETE_TAXTYPE_API             = urlConstant.TAX_TYPE_DELETE_API;

const GET_OFFER_API                  = urlConstant.GET_OFFER_API;
const GET_OFFER_TYPE_UPDATE_API      = urlConstant.GET_OFFER_TYPE_UPDATE_API;
const DELETE_OFFER_API               = urlConstant.DELETE_OFFER_TYPE_API;
const GET_USER_LIST                  = urlConstant.USER_DETAILS_API;



GeneralPortRouter.route('/userdetailsview').post(function (req, res) {
    var token        	= req.body.token;
    var id        	    = req.body.id;
    var postData 		={
        token		 : token,
        id           : id
    }
    console.log(req.body); 
    const options = {
					    method: 'POST',
					    uri: GET_USER_LIST,
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




GeneralPortRouter.route('/travellorderdata').post(function (req, res) {
    var sess = {token: '',user: {}};
	var token        	= req.body.token;
    var postData 		={
		token		 : token,
    }
    console.log(postData);
    const options = {
					    method: 'POST',
					    uri: GET_TRAVEL_ORDER_LIST,
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




/**************Get General Setting List API Start Here*****************************/
GeneralPortRouter.route('/getalldashboard').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
        token	    : token,
    }
    const options = {
        method: 'POST',
        uri: DASHBOARD_DATA,
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



/**************Get General Setting List API Start Here*****************************/
GeneralPortRouter.route('/setting').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
        token	    : token,
    }
    const options = {
        method: 'POST',
        uri: GENERAL_SETTING_URL,
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


GeneralPortRouter.route('/settingupdate').post(function (req, res,next) {
    var token       = req.body.token;
    var body        = req.body.body;
    var postData ={
        token	    : token,
        body        : body
    }
    const options = {
        method: 'POST',
        uri: GENERAL_SETTING_UPDATE_URL,
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
GeneralPortRouter.route('/addseating').post(function (req, res,next) {
    var token       = req.body.token;
    var title       = req.body.title;
    var status      = req.body.status;
    var postData ={
        token	    : token,
        title       : title,
        status      : status
    }
    const options = {
        method: 'POST',
        uri: ADD_SEAT_API,
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



GeneralPortRouter.route('/updategetalloffer').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var offer_name  = req.body.offer_name;
    var offer_code  = req.body.offer_code;
    var offer_type  = req.body.offer_type;
    var offer_value = req.body.offer_value;
    var valid_from  = req.body.valid_from;
    var valid_untill= req.body.valid_untill;
    var status      = req.body.status;
    var postData ={
            token	    : token,
            id  	    : id,
            offer_name  : offer_name,
            offer_code  : offer_code,
            offer_type  : offer_type,
            offer_value : offer_value,
            valid_from  : valid_from,
            valid_untill: valid_untill,
            status 	    : status,
    }
    const options = {
        method: 'POST',
        uri: GET_OFFER_TYPE_UPDATE_API,
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



GeneralPortRouter.route('/updategetalltax').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var tax_type    = req.body.tax_type;
    var value       = req.body.value;
    var status      = req.body.status;
    var postData ={
        token	    : token,
        id  	    : id,
        tax_type    : tax_type,
        value  	    : value,
        status 	    : status,
    }
    const options = {
        method: 'POST',
        uri: GET_TAX_TYPE_UPDATE_API,
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


GeneralPortRouter.route('/getalltax').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
        token	    : token,
    }
    const options = {
        method: 'POST',
        uri: GET_TAX_API,
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


GeneralPortRouter.route('/deleteoffer').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var postData ={
            token	    : token,
            id  	    : id,
    }
    const options = {
        method: 'POST',
        uri: DELETE_OFFER_API,
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


GeneralPortRouter.route('/getallofferlist').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
        token	    : token,
    }
    const options = {
        method: 'POST',
        uri: GET_OFFER_API,
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



GeneralPortRouter.route('/getseatinglist').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
        token	    : token,
    }
    const options = {
        method: 'POST',
        uri: GET_SEAT_API,
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



GeneralPortRouter.route('/getseattype').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var postData ={
        token	    : token,
        id  	    : id,
    }
    const options = {
        method: 'POST',
        uri: GET_SEAT_API,
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






GeneralPortRouter.route('/updateseat').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var title       = req.body.title;
    var status      = req.body.status;
    var postData ={
        token	    : token,
        id  	    : id,
        title       : title,
        status      : status
    }
    const options = {
        method: 'POST',
        uri: UPDATE_SEAT_API,
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




GeneralPortRouter.route('/getpagelist').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
        token	    : token,
    }
    const options = {
        method: 'POST',
        uri: GET_PAGE_LIST_API,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});




GeneralPortRouter.route('/getpagedetail').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var postData ={
        token	    : token,
        id          : id
    }
    const options = {
        method: 'POST',
        uri: GET_PAGE_DETAIL_API,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});


GeneralPortRouter.route('/pagedetailupdate').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var title       = req.body.title;
    var description = req.body.description;
    var slug        = req.body.slug;
    var status      = req.body.status;
    var postData ={
        token	    : token,
        id  	    : id,
        title       : title,
        description : description,
        slug        : slug,
        status      : status
    }
    const options = {
        method: 'POST',
        uri: UPDATE_PAGE_DETAIL_API,
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





GeneralPortRouter.route('/getviedolist').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
            token	    : token,
    }
    const options = {
        method: 'POST',
        uri: UPDATE_PAGE_DETAIL_API,
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





GeneralPortRouter.route('/viedoupdate').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var title       = req.body.title;
    var url         = req.body.url;
    var status      = req.body.status;
    var postData ={
            token	    : token,
            id  	    : id,
            title       : title,
            url         : url,
            status      : status
    }
    const options = {
        method: 'POST',
        uri: UPDATE_VIEDO_API,
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





GeneralPortRouter.route('/getviedos').post(function (req, res,next) {
    var token       = req.body.token;
    var postData ={
            token	    : token,
    }
    const options = {
        method: 'POST',
        uri: GET_VIEDO_API,
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




GeneralPortRouter.route('/deletetaxtype').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var postData ={
        token	    : token,
        id  	    : id,
    }
    const options = {
        method: 'POST',
        uri: DELETE_TAXTYPE_API,
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


GeneralPortRouter.route('/deleteviedo').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var postData ={
            token	    : token,
            id  	    : id,
    }
    const options = {
        method: 'POST',
        uri: DELETE_VIEDO_API,
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






GeneralPortRouter.route('/membershipplanpriceupdate').post(function (req, res,next) {
    var token               = req.body.token;
    var id                  = req.body.id;
    var name                = req.body.name;
    var monthly_price       = req.body.monthly_price;
    var yearly_price        = req.body.yearly_price;
    var quarterly_price     = req.body.quarterly_price;
    var status              = req.body.status;


    var postData ={
            token	            : token,
            id  	            : id,
            name  	            : name,
            monthly_price       : monthly_price,
            yearly_price        : yearly_price,
            quarterly_price     : quarterly_price,
            status	            : status,
    }
    const options = {
        method: 'POST',
        uri: MEMBERSHIP_PLAN_PRICE_UPDATE_API,
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


GeneralPortRouter.route('/membershipplandelete').post(function (req, res,next) {
    var token               = req.body.token;
    var id                  = req.body.id;
    var postData ={
            token	            : token,
            id  	            : id,
    }
    const options = {
        method: 'POST',
        uri: MEMBERSHIP_PLAN_DELETE_API,
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



GeneralPortRouter.route('/membershipplanupdate').post(function (req, res,next) {
    var token               = req.body.token;
    var id                  = req.body.id;
    var membership_plan_id  = req.body.membership_plan_id;
    var feature_title       = req.body.feature_title;
    var status              = req.body.status;
    var postData ={
            token	            : token,
            id  	            : id,
            membership_plan_id  : membership_plan_id,
            feature_title       : feature_title,
            status              : status
    }
    const options = {
        method: 'POST',
        uri: MEMBERSHIP_PLAN_UPDATE_API,
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




GeneralPortRouter.route('/membershipplanlist').post(function (req, res,next) {
    var token       = req.body.token;
    var id          = req.body.id;
    var postData ={
            token	    : token,
            id  	    : id,
    }
    const options = {
        method: 'POST',
        uri: MEMBERSHIP_PLAN_LIST_API,
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
GeneralPortRouter.route('/banneruploadimage').post(function (req, res,next) {
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
        uri: BANNER_IMAGE_UPLOAD_API_POST,
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
GeneralPortRouter.route('/deletebannerimage').post(function (req, res,next) {
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
        uri: BANNER_IAMGE_DELETE_API_POST,
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
GeneralPortRouter.route('/defaultbannerimage').post(function (req, res,next) {
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
        uri: BANNER_IAMGE_DEFAULT_API_POST,
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
GeneralPortRouter.route('/updatebannerstatusimage').post(function (req, res,next) {
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
        uri: BANNER_IAMGE_STATUS_API_POST,
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




/**************ADD City List From State Id Here**********************************/
GeneralPortRouter.route('/getcitylist').post(function (req, res,next) {
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
        uri: BANNER_IAMGE_STATUS_API_POST,
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
