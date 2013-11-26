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
	//var messageHandler1 = new LABBY.mezzage.Message();
	var messageHandler2 = new Constr();

	//var SetMessage = new messageHandler1.setMessage();

	//var GetMessage = new messageHandler1.getMessage();

	//console.log(getMessage);
	//var User = new messageHandler1.user("sherief", {text: "hej", date: "date1"});
	//var user = new User("sherief", {text: "hej", date: "date1"});

	printMessage = function(message){
		index++;
		//messageHandler1.setMessage({text: message, date: "date1"});
		console.log(messageHandler2);
		messageHandler2.setMessage({text: message, date: "date2"});
		//SetMessage({text: message, date: "date1"});

		//console.log(GetMessage(index));
		//console.log(User);

		//console.log(GetMessage(index).text);
		console.log(messageHandler2);

		//return GetMessage(index).text;
		return messageHandler2.getMessage(index).text;
	}
}

		// filterOut: function(target){
		// 	if(target.id !== "send"){
		// 		return true;
		// 	}
		// 	else{
		// 		return false;
		// 	}
		// },
		// Immediate function set init with an initialization object

			// handleEvent.handler({
	// 	element: document.querySelector("#send"),

	// 	eventType: "keypress",

	// 	worker: function(target){
	// 		console.log(target);
	// 	},

	// 	useCapture: false,

	// 	preventDefault: true
	// });

// Object.defineProperty(this, "name", {
// 	get: 
// 	set:
// });

// var LABBY = LABBY || {};

// LABBY.namespace = function(ns_string)
// {
// 	var parts = ns_string.split('.'),
// 	parent = LABBY,
// 	i;
	
// 	if(parts[0] === "LABBY")
// 	{
// 		parts = parts.slice(1);
// 	}
	
// 	for(i=0; i<parts.length; i+=1)
// 	{
// 		if(typeof parent[parts[i]] === "undefined")
// 		{
// 			parent[parts[i]] = {};
// 		}
// 		parent = parent[parts[i]];
// 	}
// 	return parent;
// }

// // Define namespace for Message module
// LABBY.namespace('mezzage.Message');

// // MESSAGE MODULE
// /**
//  * Create constructors for message web application.
//  * @author Sherief Badran <sb222rf@student.lnu.se>
//  * @namespace LABBY.mezzage.Message
//  * @class Message
//  * @call LABBY.mezzage.Message()
//  * @param {[Object]} [args] ...
//  * []
//  */

// LABBY.mezzage.Message = (function()
// {
// 	// dependencies: none
	
// 	// PRIVATE PROPERTIES

	
// 	// optionally one-time init procedures: none
	
// 	// PUBLIC API
		
// 	Message = function(messageObj){
// 		var messages = [];

// 		this.setMessage = function(messageObj){
			
// 			if(typeof messageObj !== "object"){
// 				throw { message: "Error! Argument has to be of type object"}
// 			}

// 			messages.push(messageObj);
// 		};

// 		this.getMessage = function(index){
// 			return messages[index];
// 		};
// 	};

// 	// prototype object
// 	Message.prototype = {
// 		// Constructor Functions
// 		getVar1: function(){
// 			return this.var1;
// 		}
// 	};

// 	Labby = function(name){
// 		var message = [];
// 	};

// 	// return the constructor to be assigned to the new namespace
// 	return { Message: Message, User: User };
// }());

// Object.defineProperty(this, "name", {
// 	get: 
// 	set:
// });

var LABBY = LABBY || {};

LABBY.namespace = function(ns_string)
{
	var parts = ns_string.split('.'),
	parent = LABBY,
	i;
	
	if(parts[0] === "LABBY")
	{
		parts = parts.slice(1);
	}
	
	for(i=0; i<parts.length; i+=1)
	{
		if(typeof parent[parts[i]] === "undefined")
		{
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
}

// Define namespace for Message module
LABBY.namespace('mezzage.Message');

// MESSAGE MODULE
/**
 * Create constructors for message web application.
 * @author Sherief Badran <sb222rf@student.lnu.se>
 * @namespace LABBY.mezzage.Message
 * @class Message
 * @call LABBY.mezzage.Message()
 * @param {[Object]} [args] ...
 * []
 */

LABBY.mezzage.Message = (function()
{
	// dependencies: none
	
	// PRIVATE PROPERTIES

	
	// optionally one-time init procedures: none
	
	// PUBLIC API
		
	Message = function(messageObj){
		var messages = [];

		this.setMessage = function(messageObj){
			
			if(typeof messageObj !== "object"){
				throw { message: "Error! Argument has to be of type object"}
			}

			messages.push(messageObj);
		};

		this.getMessage = function(index){
			return messages[index];
		};
	};

	// prototype object
	Message.prototype = {
		// Constructor Functions
		getVar1: function(){
			return this.var1;
		}
	};

	Labby = function(messageRef){
		var message = [];

		this.storeMessage = function(messageRef){
			messageRef.setMessage(messageObj);
		}

		this.getMessage = function(index){
			
		}
	};

	// return the constructor to be assigned to the new namespace
	return { Message: Message, User: User };
}());