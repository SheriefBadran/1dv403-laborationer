"use strict";

window.onload = function(){

	
	var birthday = function(date){
		
			// Din kod här.
			// Check if date input is on the format YYYY-MM-DD, if not, throw an exception
			if(!date.match(/^(\d{4})([\/-])(\d{1,2})\2(\d{1,2})$/))
			{
				throw { message: "Fel! Ange födelsedatum på formatet ÅÅÅÅ-MM-DD." };
			}

			var splitDate,
			oneDayInMilliSeconds = 1000 * 60 * 60 * 24,

			// Get current date in milliseconds
			now = new Date(),
			birthday, remainingMilliSeconds, remainingDays;

			// Split end-date into [yyyy, mm, dd]
			splitDate = date.split('-');

			// Create a birthday Date - variable and compensate for month-value (incorrect in current date)
			birthday = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
			remainingMilliSeconds = (birthday.getTime() - now.getTime());

			// Round remainingDays (negative and positive) upwards to get correct result since day is switched to next day 12:00
			remainingDays = Math.ceil(remainingMilliSeconds/oneDayInMilliSeconds);

			// Check if date input is a previous date, if not, throw an exception
			if(remainingDays < 0) { throw{ message: "Error! Ange ett födelsedatum framåt i tiden." }; }

			return remainingDays;

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			input.value = ""; // Tömmer texten i textrutan genom att ersätta texten med en tom sträng.

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};