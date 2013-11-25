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

	console.log(Message);

	console.log(dom);
	//var elements = dom.getElementFrag();
	console.log(LABBY);
	console.log(WEBAPP);


	var handleEvent = WEBAPP.utilities.handleEvent;
	handleEvent.handler({
		element: document.querySelector("#send"),

		eventType: "click",

		filterOut: function(target){
			if(target.id !== "send"){
				return;
			}
		},
		// Immediate function set init with an initialization object
		init: (function(){
			return {
				messageHandler: new Message(),
				index: -1
			};
		}()),

		// Worker does actual work on click event, init-obj is passed as argument from the WEBAPP module (that sets main tasks).
		worker: function(init, e){

			// variables for worker function
			var input = document.querySelector("#message").value,
			messageHandler, 
			text, 
			index = init.index;

			// Increment index to retrieve correct values
			init.index++;

			messageHandler = init.messageHandler;
			messageHandler.setMessage({text: input, date: new Date()});

			text = messageHandler.getMessage(init.index).text,
			date = messageHandler.getMessage(init.index).date;

			printMessage(text, date, init.index);
			// console.log(init.messageHandler);
			// console.log("main work");
		},

		useCapture: false,

		preventDefault: true
	});

	var printMessage = function(text, date, index){
		var frag = dom.getElementFrag(text, date);
		var messageSection = document.querySelector('#messageSection');

		messageSection.appendChild(frag);
		console.log(index + 1);
	}
});