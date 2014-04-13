// // var userLocation, radius, latitude, longitude, rank;
//  var tsession = require("temboo/core/temboosession");
//  var session = new tsession.TembooSession("samkreter", "Rpicker", "1b32c6ff7d394e29885041b925f4f458");
// // //get foursquare library 
// var Foursquare = require("temboo/Library/Foursquare/Venues");
// //set up input varibles
// var exploreChoreo = new Foursquare.Explore(session);
// var exploreInputs = exploreChoreo.newInputSet();

// User inputs
exports.saveOptions = function (data, callback){
  var city = data.city;
  var state = data.state;
  userLocation = city + ', ' + state;  
  if(data.radius === null){
    radius = 0;
  }else{
    radius = data.radius;
  }
  rank = data.rating;


// $( "form" ).submit(function( event ) {
//     console.log( $( this ).serializeArray() );
//     event.preventDefault();
//   });



// $( "form" ).submit(function( event ) {
//     console.log( $( this ).serializeArray() );
//     event.preventDefault();
//   });


// Set inputs
  var Mradius = radius * 1609.34;
  exploreInputs.set_ClientSecret("CGF0CXUPEOMXPVLF1OVLITXQWJRETO4SI5OOAVGR0DM441EM");
  if(latitude != 0){  
    exploreInputs.set_Latitude(latitude);
    exploreInputs.set_Longitude(longitude);
    exploreInputs.set_Radius(Mradius);
  }
  else{
  	exploreInputs.set_Near(location);
  }
  exploreInputs.set_ClientID("0Y4WX42SOV1NXZOC2AGSUZAUOKQ1LVYDIK4WAMI5UK0OG3LU");

  exploreInputs.set_Limit(500);

  exploreChoreo.execute(
    exploreInputs,
    function(results){
     var obj = inspectObj(JSON.parse(results.get_Response()));
    },
    
    function(error){
      console.log(error.type); 
      console.log(error.message);
    });
  console.log(obj);
  callback(obj);
}

// })
function inspectObj(obj){
   var length = obj.response.groups[0].items.length;
   var venues = obj.response.groups[0].items;
   var names = rating = [];
  // var rating = [];
 
   // console.log(obj.response.headerLocation);

   for(var i=0;i<length;i++){
     if(venues[i].venue.rating >= rank){
     names.push(venues[i].venue.name);
     rating.push(venues[i].venue.rating);
     }
   }
   for(var i=0; i<names.length; i++){
   	  console.log(names[i]);
   	  console.log(rating[i]);
   }
};