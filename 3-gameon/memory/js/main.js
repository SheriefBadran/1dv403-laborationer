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

	var rows;
	var columns;

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
		element: document.querySelector('#rows'),

		eventType: "click",

		filterOut: function(target, e){
			if(target.tagName.toLowerCase() !== "option"){
				return true;
			}
			return false;
		},

		worker: function(target, e){
			if(!rows){
				// publisher.publish(target.value);
				rows = target.value;
				var frag = memory.renderRows(rows);
				publisher.publish(frag);
			}
		}, 
		useCapture: false, stopPropagation: true, preventDefault: true
	};

	var columnEventObj = {
		element: document.querySelector('#columns'),

		eventType: "click",

		filterOut: function(target, e){
			if(target.tagName.toLowerCase() !== "option"){
				return true;
			}
			return false;
		},

		worker: function(target, e){
			if(!columns && rows){
				// publisher.publish(target.value);
				columns = target.value;
				memory.renderColumns(columns);
			}
		}, 
		useCapture: false, stopPropagation: true, preventDefault: true
	};

	// make eventObj a publisher.
	// makePublisher(rowEventObj);
	makePublisher(columnEventObj);

	// make memorytest a subscriber.
	// publisher.subscribe(memory.renderRows);
	publisher.subscribe(memory.renderColumns);

	// fire event.
	handleEvent.handler(rowEventObj);
	handleEvent.handler(columnEventObj);

});