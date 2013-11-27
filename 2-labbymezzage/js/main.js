'use strict';

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

	// - MODULE INITIALIZATIONS -
	// Retrieve module constructors from namespace LABBY.Chat.
	var Message = LABBY.Chat.Message;
	var MessageStorage = LABBY.Chat.MessageStorage;

	// Retrieve handleEvent module from namespace WEBAPP.utilities.
	var handleEvent = WEBAPP.utilities.handleEvent;

	// - INSTANTIATIONS -
	// Instantiate the MessageStorage constructor.
	var storage = new MessageStorage();

	// - DOM QUERIES -
	// Retrieve element for attached event listener.
	var listenerAttachElement = document.querySelector(".wrapper");

	// Retrieve the counter's parent element (section tag).
	var counterBoxSection = document.querySelector("#counter");

	// Retrieve message input form field.
	var input = document.querySelector("#message");

	// Retrieve section element that holds a message.
	var messageSection = document.querySelector('#messageSection');

	// - CREATE DOM -
	// Create text node for message counter.
	var counterData = document.createTextNode("Antal Meddelanden: 0");

	// Append counterdata to DOM tree.
	counterBoxSection.appendChild(counterData);


	// - TEST BLOCK -
	// console.log(Message);
	// console.log(MessageStorage);
	// console.log(dom);
	// console.log(WEBAPP);

	// var storage = new MessageStorage();

	// storage.storeMessage(new Message("meddelande", new Date()));
	// storage.storeMessage(new Message("Hej.", new Date()));
	// storage.storeMessage(new Message("Hur mår du?", new Date()));
	// storage.storeMessage(new Message("Jag mår bra.", new Date()));
	// storage.storeMessage(new Message("Programmerar du?", new Date()));
	// var ref = storage.getMessage(0);
	// console.log(ref.getDate());
	// console.log(storage.getMessage(0).getText());
	// console.log(storage.getAllMessages());
	// console.log(storage.RenderMessage(4));
	// console.log(storage.RenderMessages());

	// - END TEST BLOCK -



	// Call the event deligation module.
	handleEvent.handler({
		element: listenerAttachElement,

		eventType: "click",

		filterOut: function(target){
			if(target.id !== "send"){
				return true;
			}
			else{
				return false;
			}
		},
		// Immediate function set init with an initialization object
		init: (function(){
			return {
				index: -1
			};
		}()),

		// Worker does actual work on click event, init-obj is passed as argument from the WEBAPP module (that sets main tasks).
		worker: function(target, init, e){
			//WHEN MANY CLICK-EVENTS, LET THE MODULE SEND WORKER INFO ON WHAT IS CLICKED AND WHICH
			//FUNCTIONS TO CALL.
			if(target.id === "send"){
				printMessage(init);
			}

		},

		useCapture: false,

		preventDefault: true
	});

	var printMessage = function(init){
		// variables for worker function
		var frag,
		index = init.index;

		// Increment index to retrieve correct values
		init.index++;

		// Create a new Message reference/object and sore it in the MessageStorage class.
		storage.storeMessage(new Message(input.value, new Date()));

		frag = storage.RenderMessage(init.index);
		messageSection.appendChild(frag);
		input.value = "";

		// Replace and update counter data.
		counterData.nodeValue = "Antal meddelanden: " + (init.index + 1).toString();
		counterBoxSection.appendChild(counterData);
	};
});