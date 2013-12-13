'use strict';

requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		mod: '../mod',
		observer: '../observer',
		random: '../random',
		board: '../board',
		json: '../../json'
	},
	shim: {
		WEBAPP: {
			deps: ['json/json2']
		},
		meomory: {
			exports: 'memory'
		}
	}
});

var files = ["WEBAPP", "observer/publisher", "mod/memory", "random/randomGenerator", "board/boardchoice"];

requirejs(files, function(webapp, observer, memory, randomGenerator, board){

	init();

	function init(){
		renderBoard();
	};

	function renderBoard(){

		var doc = document,
		selectRowElement = doc.querySelector('#rows'),
		selectColumnElement = doc.querySelector('#columns');

		rows,
		columns;

		// create event handler object
		var handleEvent = WEBAPP.utilities.handleEvent;

		// create settings object for event handler triggered with row number choice.
		var rowEventObj = {
			element: selectRowElement,

			eventType: "click",

			filterOut: function(target, e){
				if(target.tagName.toLowerCase() !== "option"){
					return true;
				}
				return false;
			},

			worker: function(target, e){
				if(!rows){
					rows = target.value;
					var frag = memory.renderRows(rows);

					// publish document fragment containing html for the rows. (memory.renderColumns subscribes).
					observer.publish(frag);
				}
			}, 
			useCapture: false, stopPropagation: true, preventDefault: true
		};

		// create settings object for event handler triggered with column number choice.
		var columnEventObj = {
			element: selectColumnElement,

			eventType: "click",

			filterOut: function(target, e){
				if(target.tagName.toLowerCase() !== "option"){
					return true;
				}
				return false;
			},

			worker: function(target, e){
				if(!columns && rows){
					columns = target.value;
					memory.renderColumns(columns);
				}
			}, 
			useCapture: false, stopPropagation: true, preventDefault: true
		};

		var handleImages = function(imageObj){
			console.log(imageObj);
			// var images = imageObj
		};

		// make columnEventObj a publisher.
		observer.makePublisher(columnEventObj);

		// make memory.renderColumns a subscriber.
		observer.subscribe(memory.renderColumns);

		// make memory.renderColumns a publisher.
		observer.makePublisher(memory.renderColumns);

		// make handleImages a subscriber.
		observer.subscribe(handleImages); 


		// fire events.
		handleEvent.handler(rowEventObj);
		handleEvent.handler(columnEventObj);
	};


});