
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var Firebase = require('firebase');
var myRootRef = new Firebase('https://blinding-fire-4443.firebaseio.com/');

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

var title = 'Restaurant Picker'

app.get('/', function(req, res){
	res.render('index', {title: title});
});

app.get('/manual', function(req,res){
	res.render('manual', {title: title});
});

app.get('/options', function(req, res){
	res.render('options', {title: title});
});

app.get('/auto', function(req, res){
	res.render('auto', {title: title});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
