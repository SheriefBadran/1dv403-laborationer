requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		mod: '../mod',
		//message: 'message',
		json: '../../json'
	},
	shim: {
		'WEBAPP': {
			deps: ['json/json2']
		}
	}
});

var files = ["WEBAPP", "message", "mod/dom"];

requirejs(files, function(webapp, message, dom){
	var counterBoxSection = document.querySelector("#counter");
	console.log(Message);
	console.log(MessageStorage);
	console.log(dom);
	console.log(WEBAPP);

	var storage = new MessageStorage();

	storage.storeMessage(new Message("meddelande", new Date()));
	var ref = storage.getMessage(0);
	console.log(ref.getDate());
	console.log(storage.getMessage(0).getText());

	//printMessage();
	var handleEvent = WEBAPP.utilities.handleEvent;

	// Call the event deligation module.
	// handleEvent.handler({
	// 	element: document.querySelector(".wrapper"),

	// 	eventType: "click",

	// 	filterOut: function(target){
	// 		if(target.id !== "send"){
	// 			return true;
	// 		}
	// 		else{
	// 			return false;
	// 		}
	// 	},
	// 	// Immediate function set init with an initialization object
	// 	init: (function(){
	// 		return {
	// 			messageHandler: new Message(),
	// 			index: -1
	// 		};
	// 	}()),

	// 	// Worker does actual work on click event, init-obj is passed as argument from the WEBAPP module (that sets main tasks).
	// 	worker: function(init, target, e){
	// 		//WHEN MANY CLICK-EVENTS, LET THE MODULE SEND WORKER INFO ON WHAT IS CLICKED AND WHICH
	// 		//FUNCTIONS TO CALL.
	// 		if(target.id === "send"){
	// 			printMessage(init);
	// 		}

	// 	},

	// 	useCapture: false,

	// 	preventDefault: true
	// });

	// var printMessage = function(init){
	// 	// variables for worker function
	// 	var input = document.querySelector("#message").value,
	// 	messageHandler, 
	// 	text, 
	// 	index = init.index;

	// 	// Increment index to retrieve correct values
	// 	init.index++;

	// 	messageHandler = init.messageHandler;
	// 	// if(init.index === 0){
	// 	// 	printMessage();
	// 	// }

	// 	// GIVE THE MESSAGE OBJECT AN ID-PROPERTY!!!!!!!!!!!!(MAYBE INSERT IT TO HTML CODE)
	// 	// ALSO INVESTIGATE THE "e" AND TARGET IN EVENTHANDLER AND WORKER.
	// 	// PASS TARGET AS ARGUMENT FROM WEBAPP TO WORKER!!
	// 	messageHandler.setMessage({text: input, date: new Date()});

	// 	text = messageHandler.getMessage(init.index).text,
	// 	date = messageHandler.getMessage(init.index).date;


	// 	var frag = dom.getElementFrag(text, date);
	// 	var messageSection = document.querySelector('#messageSection');

	// 	messageSection.appendChild(frag);

	// 	//var counterBox = counterBoxSection.getElementsByTagName('p');
	// 	var counterData = document.createTextNode("Antal Meddelanden: " + (index + 1).toString());
	// 	counterBoxSection.innerHTML = "";
	// 	counterBoxSection.appendChild(counterData);
	// 	console.log(counterBoxSection);
	// 	console.log(counterData);

	// 	// RETURN LATEST INDEX VALUE TO WORKER !!
	// 	//console.log(test);
	// };

	// Initialization and Setup for function printMessage
	// (function(){
	// 	printMessage();
	// })();

});