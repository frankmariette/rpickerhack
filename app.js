var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("JoeLoser", "myFirstApp", "648c84a7d64e4743ad49c89dcdf03a8d");

var Yelp = require("temboo/Library/Yelp");

var searchForBusinessChoreo = new Yelp.SearchForBusiness(session);

// Instantiate and populate the input set for the choreo
var searchForBusinessInputs = searchForBusinessChoreo.newInputSet();
// Set inputs
/*
    Signed up for yelp and got this info for 2.0 API.
    ConsumerKey = Consumer Key provided by Yelp
    ConsumerSecret = Consumser Key provided by Yelp
    Token = Token provided by yelp
    TokenSecret = Token secret provided by Yelp
*/
searchForBusinessInputs.set_ConsumerSecret("7m7R_nY3LF4RGbqSBSm3M5qJpKI");
//Want to get this from user
searchForBusinessInputs.set_BusinessName("Maggiano’s Little Italy");
searchForBusinessInputs.set_Token("vpkJsX7kZ1-bIrFjMmF-brwNNvJWUfoW");
searchForBusinessInputs.set_TokenSecret("wznfo8ClPCLJmMIlQaRB6XzA08Y");
searchForBusinessInputs.set_ConsumerKey("ezLbLh5xPO2Vasgr5O2a5A");
//Want to get this from user or Google Maps as well
searchForBusinessInputs.set_City("Richmond Heights");

// Run the choreo, specifying success and error callback handlers

searchForBusinessChoreo.execute(
    searchForBusinessInputs,
    function(results){
        //Parse JSON
        if(results) {
            //console.log(results.get_Response());
            var obj = JSON.parse(results.get_Response());

            var nameOfRestaurant = obj.name;
            var rating = obj.reviews[0].rating;
            console.log(nameOfRestaurant);
            console.log(rating);
            // console.log(obj.name);
            // console.log(obj.reviews[0].rating);
        }
    }, function(error){
            console.log(error.type);
            console.log(error.message);
        }
);
;

// var obj;
// app.get('/',function(req,res){
//   exploreChoreo.execute(
//       searchForBusinessInputs,
//       function(results){
//         inspectObj(JSON.parse(results.get_Response()))
//         ;},
//       function(error){console.log(error.type); console.log(error.message);});
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production'){
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
}

module.exports = app;
