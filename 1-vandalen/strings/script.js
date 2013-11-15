"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		
		// Jag tycker JAVASCRIPT är KUL
		// string.replace
		// string.toLowerCase()
		// string.toUpperCase()
		console.log(str);
		//var stringArray = str.match(/[A-Z][a-z]+/g);
		//var stringArray = str.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1);
		//console.log(stringArray);


		for (var i = 0; i < str.length; i++) {

			//console.log(str.charAt(i).match(/([A-Z]+)/g));
			// if(str[i].match(/([A-Z]+)/g) != null)
			// {
			// 	console.log(str[i].match(/([A-Z]+)/g));
			// 	//str[i].match(/[A-Z][a-z]+/g);

			// }
			if(str[i].match(/([A-Z])/g)){
				// Gör om till lowercase.
				console.log("liten");
			}
			else{
				// Gör om till uppercase.
				console.log("stor");
			}
			//console.log(str[i].replace(/([A-Z])/g, str[i].toLowerCase()));

			// 1. Spara undan alla små bokstäver i original-strängen i en enskild array.
			// 2. Gör om alla små bokstäver i original-strängen till up
		}







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