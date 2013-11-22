window.onload = function(){

	printMessage();
	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var doc = document;

	var p = doc.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = doc.querySelector("#message");
	var submit = doc.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = printMessage(input.value);// Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		input.value = "";				// Clear input field after each guess.

		//if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			//submit.disabled = true;
		//}
	});
};

var printMessage = function(){
	index = -1;
	//var messageHandler1 = new LABBY.mezzage.Message();
	var messageHandler1 = new Message();

	printMessage = function(message){
		index++;

		messageHandler1.setMessage({text: message, date: "date2"});

		return messageHandler1.getMessage(index).text;
	}
}