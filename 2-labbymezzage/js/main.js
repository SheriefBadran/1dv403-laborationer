'use strict';

requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		mod: '../mod',
		// message: 'message',
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

	// Retrieve element for attached onclick events.
	var attachedElementOnClick = doc.querySelector(".wrapper");

	// Retrieve element for attchached keypress events. 
	var attachedElementOnKeyPress = doc.querySelector("#messageInput");

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
		element: attachedElementOnClick,

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

			// Count contains number of all message ref objects.
			var count = storage.getAllMessages().length;

			// If delete message is clicked.
			if(target.className === "pdelete large-1 columns"){

				// Confirm delete
				if(!confirm("Är du säker på att du vill radera meddelandet?")){
					return;
				}

				deleteMessage(target, count);
			}

			// If calendar is clicked.
			if(target.id === "calendar"){
				alert(storage.getMessage(target.parentNode.parentNode.id).getDate());
			}

			// If message is sent.
			if(target.id === "send"){
				printMessage(count);
			}
		},
		useCapture: false, stopPropagation: true, preventDefault: true
	});

	// Call the event deligation module for keypress in the application.
	// This event handler fires the following function(s): printMessage.
	handleEvent.handler({
		element: attachedElementOnKeyPress,

		eventType: "keypress",

		filterOut: function(target, e){
			if(e.keyCode !== 13){
				return true;
			}
			return false;
		},

		worker: function(target, e){
			var count = storage.getAllMessages().length;
			//printMessage(count);

			console.log(Message);
			dom.printMessages(doc, storage, Message, count, counterData);

		}, 
		useCapture: false, stopPropagation: true, preventDefault: true

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

	var deleteMessage = function(target, count){
		storage.deleteMessage(target.parentNode.parentNode.id);

		messageSection.innerHTML = "";

		var fragments = storage.RenderMessages();

		fragments.forEach(function(fragment){
			messageSection.appendChild(fragment);
		});

		count--;

		counterData.nodeValue = "Antal meddelanden: " + (count).toString();
		counterBoxSection.appendChild(counterData);
	};
});