
var x = function getLocation()
  {
  if (navigator.geolocation)
    {
    position = navigator.geolocation.getCurrentPosition();
    return position;
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }

  
