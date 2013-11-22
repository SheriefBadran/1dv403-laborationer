"use strict";

window.onload = function(){
	var count = 0;

	function getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min) + 1) + min;
	}


	var secret = getRandomInt(1, 100); // Detta tal behöver bytas ut mot ett slumpat tal.
	
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function(number){			

		// Parse to int if this function is used in a context were argumet comes as a string.
		if(typeof number === "string"){
			number = parseInt(number);
		}
		
		var message;
		count++;
		
		if(isNaN(number)){
			console.log("Error!! Your guess has to be an integer...");
			message = [false, "Error!! Your guess has to be an integer..."];
		}
		else if(number <= 1 || number > 100){
			message = [false, "Error!! Guess a number greater than 0 and lower than 100..."];
		}
		else{
			if(number > secret){
				message = [false, number + " is not the number, my number is lower!"];
			}
			else if(number < secret){
				message = [false, number + " is not the number, my number is higher!"];
			}
			else{
				message = [true, "You got the correct answer in " + count + " guesses!"];
			}
		}

		return message;		
	};
	
	// ------------------------------------------------------------------------------

	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value);// Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	
		input.value = "";				// Clear input field after each guess.

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};