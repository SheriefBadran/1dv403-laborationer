window.onload = function(){
	// var messageHandler1 = new LABBY.mezzage.Message({text: "hur", date: "date1"});
	// var messageHandler2 = new LABBY.mezzage.Message({text: "mår", date: "date2"});
	// // messageHandler1.getMessage.prototype.toString = function(){
	// // 	return "hej";
	// // }
	// console.log(messageHandler1);
	// console.log(messageHandler2);

	// var config = {
	// 	message: "hej",
	// 	date: "date1"
	// };


	// messageHandler1.setMessage({text: "hej", date: "date1"});
	// //print message
	// console.log(messageHandler1.getMessage(0).text);
	// var GetMessage = new messageHandler1.getMessage(0);
	// console.log(GetMessage.text);


	// console.log(GetMessage);
	// console.log(GetMessage);



	//------------------------------------------------------------------------------------------

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
	var messageHandler1 = new LABBY.mezzage.Message();

	var SetMessage = new messageHandler1.setMessage();

	var GetMessage = new messageHandler1.getMessage();

	var User = new messageHandler1.user();

	printMessage = function(message){
		index++;
		//messageHandler1.setMessage({text: message, date: "date1"});
		SetMessage({text: message, date: "date1"});

		console.log(User("Sherief", {text: message, date: "date1"}));
		console.log(GetMessage(index).text);

		return GetMessage(index).text;
	}
}