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
	var doc = document;

	// Retrieve element for attached event listener.
	var listenerAttachElement = doc.querySelector(".wrapper");

	// Retrieve the counter's parent element (section tag).
	var counterBoxSection = doc.querySelector("#counter");

	// Retrieve message input form field.
	var input = doc.querySelector("#message");

	// Retrieve section element that holds a message.
	var messageSection = doc.querySelector('#messageSection');

	// - CREATE DOM -

	// - Create default counter data -
	// Create text node for message counter.
	var counterData = doc.createTextNode("Antal Meddelanden: 0");

	// Append counterdata to DOM tree.
	counterBoxSection.appendChild(counterData);
	

	// Call the event deligation module for clicks in the application.
	// This event handler fires the followint function(s): printMessage, 
	handleEvent.handler({
		element: listenerAttachElement,

		eventType: "click",

		filterOut: function(target, e){
			if(target.id === "pMessage"){
				return true;
			}
			return false;
		},

		// Worker does actual work on click event, init-obj is passed as argument from the WEBAPP module (that sets main tasks).
		// This event handler fires the following function(s): printMessage.
		worker: function(target, e){
			//WHEN MANY CLICK-EVENTS, LET THE MODULE SEND WORKER INFO ON WHAT IS CLICKED AND WHICH
			//FUNCTIONS TO CALL.
			var count = storage.getAllMessages().length;

			if(target.className === "pdelete large-1 columns"){
				var conf = window.confirm;
				if(!conf("Är du säker på att du vill radera meddelandet?")){
					return;
				}
				//alert("Är du säker på att du vill ta bort meddelandet?");
				storage.deleteMessage(target.parentNode.parentNode.id);

				messageSection.innerHTML = "";

				var fragments = storage.RenderMessages();

				fragments.forEach(function(fragment){
					messageSection.appendChild(fragment);
				});

				count--;

				counterData.nodeValue = "Antal meddelanden: " + (count).toString();
				counterBoxSection.appendChild(counterData);
			}

			if(target.id === "calendar"){
				alert(storage.getMessage(target.parentNode.parentNode.id).getDate());
			}

			if(target.id === "send"){
				printMessage(count);
			}
		},

		useCapture: false,

		stopPropagation: true,

		preventDefault: true
	});

	// Call the event deligation module for keypress in the application.
	// This event handler fires the following function(s): printMessage.
	handleEvent.handler({
		element: document.querySelector("#messageInput"),

		eventType: "keypress",

		filterOut: function(target, e){
			if(e.keyCode !== 13){
				return true;
			}
			return false;
		},

		worker: function(target, e){
			var count = storage.getAllMessages().length;
			printMessage(count);
		},

		useCapture: false,

		stopPropagation: true,

		preventDefault: true

	});

	var printMessage = function(count){
		// variables for worker function
		var frag;

		// Create a new Message reference/object and sore it in the MessageStorage class.
		storage.storeMessage(new Message(input.value, new Date()));

		frag = storage.RenderMessage(count);
		messageSection.appendChild(frag);
		input.value = "";

		// Replace and update counter data.
		counterData.nodeValue = "Antal meddelanden: " + (count + 1).toString();
		counterBoxSection.appendChild(counterData);
	};
});