'use strict';

requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		mod: '../mod',
		observer: '../observer',
		json: '../../json'
	},
	shim: {
		'WEBAPP': {
			deps: ['json/json2']
		}
	}
});

var files = ["WEBAPP", "observer/publisher", "mod/memory"];

requirejs(files, function(webapp, observer, memory){

	var doc = document;
	var selectRowElement = doc.querySelector('#rows');
	var selectColumnElement = doc.querySelector('#columns');

	var rows;
	var columns;

	// makePublisher works together with the publisher module. The function takes an object and add on
	// functionality that enables the object to become a publisher.
	function makePublisher(o){
		var prop;
		for(prop in observer.publisher){
			if (observer.publisher.hasOwnProperty(prop) && typeof observer.publisher[prop] === "function"){
				o[prop] = observer.publisher[prop];
			}
		}
		o.subscribers = {any: []};
	};

	var publisher = observer.publisher;
	console.log(publisher);
	console.log(memory);

	// create event handler object
	var handleEvent = WEBAPP.utilities.handleEvent;

	// create settings object for event handler
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
				publisher.publish(frag);
			}
		}, 
		useCapture: false, stopPropagation: true, preventDefault: true
	};

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

	// make columnEventObj a publisher.
	makePublisher(columnEventObj);

	// make memory.renderColumns a subscriber.
	publisher.subscribe(memory.renderColumns);

	// fire events.
	handleEvent.handler(rowEventObj);
	handleEvent.handler(columnEventObj);

});