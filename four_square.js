//set up temboo session
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("samkreter", "Rpicker", "1b32c6ff7d394e29885041b925f4f458");
//get foursquar library 
var Foursquare = require("temboo/Library/Foursquare/Venues");
//set up input varibles
var exploreChoreo = new Foursquare.Explore(session);
var exploreInputs = exploreChoreo.newInputSet();


//Frank fix this shit!!!!!!!!!!!!!!!!!!!!!!!!!!
var city = "Columbia, Missouri";   
var radius = 3;
var latitude = 0;
var langitude = 0;
var rank = 8;
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1


// Set inputs
var Mradius = radius * 1609.34;
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

var obj;
exploreChoreo.execute(
  exploreInputs,
  function(results){
  inspectObj(JSON.parse(results.get_Response()))
  ;},
  function(error){console.log(error.type); console.log(error.message);});
// })
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