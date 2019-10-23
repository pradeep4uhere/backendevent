/*
 * @PageName	:: server.js
 * @Author 		:: Pradeep Kumar
 * @Description	:: Server Page with all routing of each module
 * @Created Date	:: 1 MAY 2019
 */
var express = require('express');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var corsPrefetch = require('cors-prefetch-middleware');
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieSession({
  name: 'RudraXP',
  keys: 'rudra-new-app',
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


const PORT = 4209;
const cors = require('cors');
const ServerPortRouter      = require('./routes/ServerPortRouter');
const UserPortRouter        = require('./routes/UserPortRouter');
const EventPortRouter       = require('./routes/EventPortRouter');
const TheatrePortRouter     = require('./routes/TheatrePortRouter');
const GeneralPortRouter     = require('./routes/GeneralPortRouter');
const DestinationPortRouter = require('./routes/DestinationPortRouter');
const ItinerariesPortRouter = require('./routes/ItinerariesPortRouter');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**************All Router List Here****************************/

app.use('/serverport' , ServerPortRouter);
app.use('/userport'   , UserPortRouter);
app.use('/eventport'  , EventPortRouter);
app.use('/theatreport', TheatrePortRouter);
app.use('/general'    , GeneralPortRouter);
app.use('/destination', DestinationPortRouter);
app.use('/itineraries',ItinerariesPortRouter);

/**************All Router List Here****************************/



app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});
