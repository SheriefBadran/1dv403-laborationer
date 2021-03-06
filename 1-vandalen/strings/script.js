"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		if(str === ""){
			throw { message: "FEL! Fältet måste innehålla en sträng." };
		}

		// SuperConvertedString will contain the final converted string that this function returns.
		var superConvertedString, 
		convertedString = "",
		stringArray = [];

		var i;
		for (i = 0; i < str.length; i++) {
			if(str[i].match(/([A-ZÅÄÖ])/g)){
				// For all uppercase letters in the string, convert them to lowercase and insert them into stringArray.
				stringArray[i] = str[i].replace(/([A-ZÅÄÖ])/g, str[i].toLowerCase());
			}
			else{
				// For all lowercse letters in the string, convert them to uppercase and insert them into stringArray.
				stringArray[i] = str[i].replace(/([a-zåäö])/g, str[i].toUpperCase());
			}
		}

		// Assamble all elements (letters) in stringArray back to one string value.
		var e;
		for (e = 0; e < stringArray.length; e++) {
			convertedString += stringArray[e];
			//console.log(stringArray[e]);
		}

		// Convert both lower and -uppercase "A" to "#".
		superConvertedString = convertedString.replace(/A/gi, "#");

		return superConvertedString;
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
			var answer = convertString(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};