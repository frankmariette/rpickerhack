
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("samkreter", "Rpicker", "1b32c6ff7d394e29885041b925f4f458");

var Foursquare = require("temboo/Library/Foursquare/Venues");

var exploreChoreo = new Foursquare.Explore(session);

// Instantiate and populate the input set for the choreo
var exploreInputs = exploreChoreo.newInputSet();

// Set inputs
exploreInputs.set_ClientSecret("CGF0CXUPEOMXPVLF1OVLITXQWJRETO4SI5OOAVGR0DM441EM");
exploreInputs.set_Latitude("38.94038");
exploreInputs.set_Longitude("-92.32774");
exploreInputs.set_ClientID("0Y4WX42SOV1NXZOC2AGSUZAUOKQ1LVYDIK4WAMI5UK0OG3LU");

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

/*app.get('/', function(req, res) {
  exploreChoreo.execute(
    exploreInputs,
    response = function(results){return results.get_Response();},
    function(error){console.log(error.type); console.log(error.message)});
     console.log(response);
 });*/

var obj;
app.get('/',function(req,res){
  exploreChoreo.execute(
      exploreInputs,
      function(results){
      	inspectObj(JSON.parse(results.get_Response()))
      	;},
      function(error){console.log(error.type); console.log(error.message);});
});
function inspectObj(obj){
   console.log(obj.response.groups[0].items[0].venue.name);
};
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
