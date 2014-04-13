var userLocation, radius, latitude, longitude, rank;
this.exploreInputs = exploreInputs;

// User inputs
function saveOptions(){
  var city = document.getElementById("city").value;
  var state = document.getElementById('state').value;
  userLocation = city + ', ' + state; 
  console.log(userLocation);  
  radius ? $('#radius').value : 0;
  rank = $('#rating').value;

 execution(userLocation, radius);
}


// Set inputs
function execution (location, radius) {
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
      inspectObj(JSON.parse(results.get_Response()));
    },
    
    function(error){
      console.log(error.type); 
      console.log(error.message);
    });
}

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