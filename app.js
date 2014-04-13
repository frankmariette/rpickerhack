
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var Firebase = require('firebase');
var helpers = require('./foursquare.js');
var myRootRef = new Firebase('https://blinding-fire-4443.firebaseio.com/');
//set up temboo session
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("samkreter", "Rpicker", "1b32c6ff7d394e29885041b925f4f458");
//get foursquare library 
var Foursquare = require("temboo/Library/Foursquare/Venues");
//set up input varibles
var exploreChoreo = new Foursquare.Explore(session);
var exploreInputs = exploreChoreo.newInputSet();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.cookieParser() );
app.use(express.session({secret:'thisismysupersecret'}));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routing --Needs to be fixed later and moved out of here

app.use(function(req, res, next){

	res.status(404);

	if (req.accepts('jade')){
		res.render('404', {url: req.url});
		return;
	}
});

var title = 'Restaurant Roulette';

app.get('/', function(req, res){
	res.render('index', {title: title});
});

app.get('/manual', function(req,res){
	res.render('manual', {title: title});
});

app.get('/options', function(req, res){
	res.render('options', {title: title});
	//console.log(exploreInputs);

});

app.post('/options', function(req, res){
		helpers.saveOptions( req.body, function(data){
			res.render('/selectAuto', {title: title, data: data});
			//console.log(data);
		});
});

app.get('/selectAuto', function(req, res){
	res.render('selectAuto', {title: title});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
