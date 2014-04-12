
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();


//set up temboo session
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("samkreter", "Rpicker", "1b32c6ff7d394e29885041b925f4f458");
//get foursquar library 
var Foursquare = require("temboo/Library/Foursquare/Venues");
//set up input varibles
var exploreChoreo = new Foursquare.Explore(session);
var exploreInputs = exploreChoreo.newInputSet();
//all user dependent varibles
var city = "Columbia, Missouri";
var radius = 3;
var Mradius = radius * 1609.34;
var latitude = 0;
var langitude = 0;
var rank = 8;


// Set inputs
exploreInputs.set_ClientSecret("CGF0CXUPEOMXPVLF1OVLITXQWJRETO4SI5OOAVGR0DM441EM");
if(latitude != 0){  
  exploreInputs.set_Latitude("38.94038");
  exploreInputs.set_Longitude("-92.32774");
}
else{
	exploreInputs.set_Near(city);
}
exploreInputs.set_ClientID("0Y4WX42SOV1NXZOC2AGSUZAUOKQ1LVYDIK4WAMI5UK0OG3LU");
exploreInputs.set_Radius(Mradius);
exploreInputs.set_Limit(500);



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var obj;
exploreChoreo.execute(
      exploreInputs,
      function(results){
      	inspectObj(JSON.parse(results.get_Response()))
      	;},
      function(error){console.log(error.type); console.log(error.message);});
// });
function inspectObj(obj){
   var length = obj.response.groups[0].items.length;
   var vens = obj.response.groups[0].items;
   var names = rating = [];
   var rating = [];
 
   // console.log(obj.response.headerLocation);

   for(var i=0;i<length;i++){
     if(vens[i].venue.rating >= rank){
     names.push(vens[i].venue.name);
     rating.push(vens[i].venue.rating);
     }
   }
   for(var i=0; i<names.length; i++){
   	  console.log(names[i]);
   	  console.log(rating[i]);
   }
};
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
