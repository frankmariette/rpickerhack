		// Used to keep track of number of restaurant input fields.
		var restaurantCounter = 0;
		

		// Creates an array of places currently in que and selects a choice randomly from the array.
		function pickPlace(){
			var min = 0;
			var data = $('.restaurant').toArray();
			var rand = getRandomInt(min, data.length-1);
			$('#result').remove();

			//console.log(rand);

			$('.clearfix').after('<div id="result"><scan style="color: white;">You should go to ' + data[rand].value + '!</div>');
			
		};
		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function addPlace(){
			$('#buttons').before('<div><input type="text" placeholder="Restaurant" class="form-control restaurant ' + restaurantCounter + '" required></div>');

			restaurantCounter++;
		};
