
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

var Foursquare = require("temboo/Library/Foursquare/Venues")
var ExploreChoreo = new Foursquare.Explore(session);
var ExploreInput = ExploreChoreo.newInputSet();
ExploreInput.set_AccuracyOfCoordinates(100);
var sucessFunction = function(results) {console.og("Success!)");}
var errorFunction = function(results) {console.log("Error!");}

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

app.get('/', function(req, res) {
  res.type('text/plain');
  ExploreChoreo.execute(ExploreInput,sucessFunction,errorFunction)
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
