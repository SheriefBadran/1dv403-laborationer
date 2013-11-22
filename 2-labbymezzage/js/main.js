'use strict';

requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		message: 'message',
		json: '../../json'
	},
	shim: {
		'WEBAPP': {
			deps: ['json/json2']
		}
	}
});

// requirejs(['jquery'], function(jQuery){
// 	$('#output').html('Hello World - this is my first module!');
// });

requirejs(['json/json2', 'WEBAPP', 'message'], function(json, webapp, message){
	
	console.log(User);
	

});