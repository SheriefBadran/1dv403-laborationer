/*!
*	This liberary is built according to the module pattern. 
*	The name of the global namespace object and library is WEBAPP.
*/

// setting up a namespace
var WEBAPP = WEBAPP || {};

WEBAPP.namespace = function(ns_string)
{
	var parts = ns_string.split('.'),
	parent = WEBAPP,
	i;
	
	if(parts[0] === "WEBAPP")
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

// A MODULE TO EXPERIMENT

// CREATES XMLHttpRequestObject AND MANAGE AJAX CALLS
WEBAPP.namespace('xhr');

// CREATES MAIN MENU, retrieves and prints menu values.
WEBAPP.namespace('mainMenu');

WEBAPP.namespace('utilities.handleEvent');


// AJAX MODULE
/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @author Sherief Badran <sherief.badran@sparklingcloud.com>
 * @namespace WEBAPP.xhr
 * @class xhr
 * @call WEBAPP.xhr.ajax(args)
 * @param {[Object]} [args] ...
 * [url: "string", Content-Type: "string", type: "string", data: "string", complete: function(), async: boolean(true or false), showErrors: boolean(true or false)]
 */
WEBAPP.xhr = (function()
{
	// private properties
	var settings = 
	{
		url: function(obj)
		{
			var ajaxUrl = location.href;
			if(obj.url)
			{
				ajaxUrl = obj.url;
			}
			return ajaxUrl;
		},
		
		contentType: function(obj)
		{
			var ajaxContentType = "application/x-www-form-urlencoded";
			if(obj.contentType)
			{
				ajaxContentType = obj.contentType;
				// return ajaxContentType;
			}
			// if value is not given in object parameter, default value is returned.
			return ajaxContentType;
		},
		
		type: function(obj)
		{
			var superGlobalType = "GET";
			if(obj.type)
			{
				superGlobalType = obj.type;
				// return superGlobalType;
			}
			return superGlobalType;
		},
		
		data: function(obj)
		{
			var ajaxData = null;
			if(obj.data)
			{
				// declare array variables
				var array = [],
				param = [],
				
				// declare variables
				paramString = obj.data,
				
				// split the parameters individually to different object-properties
				eachKeyValue = paramString.split('&'),
				
				// initialize the variable to hold the data to be sent to the server
				data = null;
				
				// loop through each parameter and split it in order to make it a key-value pair object, then push all key-value pair objects into
				// an array called array
				for(var i=0; i<eachKeyValue.length; i++)
				{
					array.push(eachKeyValue[i].split('='));
				}
				
				// loop through each key-value pair object in the array, encodeURIComponent the key and value, and insert "=" operator between them 
				for(var i=0; i<array.length; i++)
				{
					if(!array[i][0].match(/^[0-9A-Za-z]+$/) || !array[i][1].match(/^[0-9A-Za-z]+$/))
					{	
						console.log("BAD CHARS!");
						alert("You are not aloud to send non-alphanumeric characters to the server.");
						break;
					}
					else
					{
						console.log("no bad chars!");
					}
					param.push(encodeURIComponent(array[i][0]) + "=" + encodeURIComponent(array[i][1]));
				}
				
				// join all the key-value pair objects together with "&" character between them
				data = param.join('&');
			}
			console.log(data);
			return data;
		},
		
		success: function(obj)
		{
			var ajaxSuccess;
			if(obj.success)
			{
				ajaxSuccess = obj.success;
			}
			return ajaxSuccess;
		},
		
		complete: function(obj)
		{
			var ajaxComplete;
			if(obj.complete)
			{
				ajaxComplete = obj.complete;
			}
			return ajaxComplete;
		},
		
		async: function(obj)
		{
			var ajaxAsync = true;
			if(obj.async)
			{
				ajaxAsync = obj.async;
			}
			return ajaxAsync;
		},
		
		showErrors: function(obj)
		{
			var showAjaxErrors = true;
			if(obj.showErrors)
			{
				showAjaxErrors = obj.showErrors;
			}
			return showAjaxErrors;
		},
		
		error: function(obj)
		{
			var ajaxError;
			if(obj.error)
			{
				ajaxError = obj.error;
			}
			return ajaxError;
		}
	},
	
	// private proterty set to null, value is set in readResponse -> catch(e), and used in handleRequestStateChange if status is not 200 (OK)
	typeError = null,
	
	xhrFunctions = 
	{
		createXmlHttp: function()
		{
			// will store the reference to the XMLHttpRequest object
			var xmlHttp;
			// create the XMLHttpRequest object
			try
			{
				// assume IE7 or newer or other modern browsers
				xmlHttp = new XMLHttpRequest();
			}
			catch(e)
			{
				// assume IE6 or older
				try
				{
					xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
				}
				catch(e){ }
			}
			// return the created object or display an error message
			if(!xmlHttp)
			{
				alert("Error creating the XMLHttpRequest object");
			}
			else
			{
				return xmlHttp;
			}
		},
		
		readResponse: function(xhr, onsuccess)
		{
			console.log(xhr.getResponseHeader("Content-Type"));
			try
			{
				// retrieve the response content type
				var contentType = xhr.getResponseHeader("Content-Type");

				// build the json object if the response has one
				if(contentType == "application/json")
				{
					response = JSON.parse(xhr.responseText);
					console.log(response);
				}
				// get the DOM element if the response is XML
				else if(contentType == "text/xml")
				{
					response = xhr.responseXml;
					console.log(response);
				}
				else
				{
					response = xhr.responseText;
					console.log(response);
				}
				// call the callback function if any
				if(onsuccess)
				{
					onsuccess(xhr, response, xhr.status);
				}
			}
			catch(e)
			{
				this.typeError = e.toString();
			}
		},
		
		handleRequestStateChange: function(xhr, rscParam)
		{	
			// create local variables to work with instead of nested properties, resulting in better performance.
			var onsuccess = rscParam.success,
			oncomplete = rscParam.complete,
			error = rscParam.error;
			
			// when readyState is 4, we read the server response
			if(xhr.readyState == 4)
			{
				try
				{
					this.readResponse(xhr, onsuccess);
				}
				catch(e)
				{
					alert(e.toString());
				}
				// if HTTP status is "OK", an oncomplete function (with access to the xhr-object and status) can be called
				if(xhr.status == 200)
				{
					if(oncomplete)
					{
						oncomplete(xhr, xhr.status);
					}
				}
				else
				{
					// call the error callback function to display errors. this.typeError is a module private property
					if(error)
					{
						error(xhr, xhr.statusText, this.typeError);
					}
				}
			}
		}
	};
	
	// facade and public API
	return{
		ajax: function(args)
		{			
			var ajaxSettings =
			{
				url: settings.url(args),
				contentType: settings.contentType(args),
				type: settings.type(args),
				data: settings.data(args),
				success: settings.success(args),
				complete: settings.complete(args),
				async: settings.async(args),
				showErrors: settings.showErrors(args),
				error: settings.error(args)
			};
			
			// group the RSC-parameters in an object, RSC is a shortening for RequestStateChange.
			// this object is to be sent as a parameter in handleRequestStateChange.
			var rscParam =
			{
				success: ajaxSettings.success,
				complete: ajaxSettings.complete,
				error: ajaxSettings.error
			};
			
			// create XMLHttpRequesObject
			var xhr = xhrFunctions.createXmlHttp();
			
			if(ajaxSettings.type === "POST")
			{
				xhr.open(ajaxSettings.type, ajaxSettings.url, ajaxSettings.async);
				xhr.onreadystatechange = function()
				{
					xhrFunctions.handleRequestStateChange(xhr, rscParam);
				};
				xhr.setRequestHeader("Content-Type", ajaxSettings.contentType);
				xhr.send(ajaxSettings.data);
			}
			else if(ajaxSettings.type === "GET")
			{
				// initialize the requests cache
				var cache = [],
				
				// initialize the request query string to null
				params = null;
				
				params = "?" + ajaxSettings.data;
				
				// make sure not adding null params
				if(params)
				{
					cache.push(params);
				}
				
				var cacheEntry = cache.shift();
				
				xhr.open(ajaxSettings.type, ajaxSettings.url + cacheEntry, ajaxSettings.async);
				xhr.onreadystatechange = function()
				{
					xhrFunctions.handleRequestStateChange(xhr, rscParam);
				};
				xhr.setRequestHeader("Content-Type", ajaxSettings.contentType);
				xhr.send(null);
			}
		}
	};
}());


WEBAPP.mainMenu = (function()
{
	// private properties
	var settings =
	{
		menuURL: function(obj)
		{
			var url = "php/tab_menu_controler.php";
			if(obj.menuURL)
			{
				url = obj.menuURL;
			}
			return url;
		},
		
		menuMode: function(obj)
		{
			var mode = "mode=tabmenu";
			if(obj.mode)
			{
				mode = obj.mode;
			}
			return mode;
		},
		
		domPlace: function(obj)
		{
			var dom;
			if(obj.dom)
			{
				dom = obj.dom;
			}
			return dom;
		}
	},
	
	ajaxFunction =
	{
		getMenuValues: function(callback, params)
		{
			var mainMenuValues = WEBAPP.xhr;

			mainMenuValues.ajax({
				url: params.url,
				contentType: "application/x-www-form-urlencoded",
				type: "POST",
				async: true,
				data: params.mode,
				success: function (xhr, response, status)
			    {
					if(xhr.responseText.indexOf("ERRNO") >= 0 || xhr.responseText.indexOf("error:") >= 0 || xhr.responseText.length == 0)
					{
						alert(xhr.responseText.length == 0 ? "Server error." : response);
					}
					else
					{
						callback();
					}
				},
				complete: function (xhr, status)
				{
					console.log("Ajax Call is completed!");
				},
				showErrors: true,
				error: function(xhr, statusText, typeError)
				{
					// when set to true, display detailed error messages
					var debugMode = true;

					// display error message, with more technical details if debugMode is true
					// for documentation, remember that all errorinfo is accessible in xhr.responseText
					alert("Error accessing the server! " + (debugMode ? xhr.status + " " + statusText + "\r\n" + typeError: ""));
				}
			});
		}
	};
	// facade and public API
	return{
		createMainMenu: function(args)
		{
			var ajaxSettings =
			{
				url: settings.menuURL(args),
				mode: settings.menuMode(args)
			},
			
			menuSettings =
			{
				dom: settings.domPlace(args)
			},
			
			placeHolder = menuSettings.dom;
			
			
			
			ajaxFunction.getMenuValues(function(){
				// console.log(response.menu[0][0].menu_name);
				// exchange code below for a callback.
				
				for(var i=0, max=response.menu[0].length; i<max; i++)
				{
					// compose the HTML code that displays the menu
					var htmlMenu = "";

					htmlMenu += "<li>";
					htmlMenu += "<a href=\"#\"" + "id=" + "\"" + response.menu[0][i].id + "\"" + " class=\"item\"" + ">";
					htmlMenu += response.menu[0][i].menu_name;
					htmlMenu += "</a>";
					htmlMenu += "</li>";

					// display the menu
					placeHolder.innerHTML += htmlMenu;
				}
			}, ajaxSettings);
		}
	};
}());

WEBAPP.utilities.handleEvent = (function(){
	
	// private properties
	var settings = {
		element: function(obj){
			var el;
			if(typeof obj.element === "object"){
				el = obj.element;
			}
			return el;
		},
		
		eventType: function(obj){
			var evType;
			if(typeof obj.eventType === "string"){
				evType = obj.eventType;
			}
			return evType;
		},

		filterOut: function(obj){
			var filter = null;
			if(typeof obj.filterOut === "function"){
				filter = obj.filterOut;
			}
			return filter;
		},

		init: function(obj){
			var init = null;
			if(typeof obj.init === "object"){
				init = obj.init;
			}
			return init;
		},
		
		worker: function(obj){
			var worker;
			if(typeof obj.worker === "function"){
				worker = obj.worker;
			}
			return worker;
		},

		useCapture: function(obj){
			var capture = false;
			if(typeof obj.useCapture === "boolean"){
				capture = obj.useCapture;
			}
			return capture;
		},

		stopPropagation: function(obj){
			var stopPropagation = false;
			if(typeof obj.stopPropagation === "boolean"){
				stopPropagation = obj.stopPropagation;
			}
			return stopPropagation;
		},

		preventDefault: function(obj){
			var preventDefault = false;
			if(typeof obj.preventDefault === "boolean"){
				preventDefault = obj.preventDefault;
			}
			return preventDefault;
		}
	},

	eventFunc = {
		callback: function(element, eventType, filterOut, worker, init, useCapture, stopPropagation, preventDefault){

			if(document.addEventListener){
				element.addEventListener(eventType, workOnEvent, useCapture);
			}

			function workOnEvent(e){
				var src, parts;

				// get event and source element
				e = e || window.event;
				var target = (typeof e.target !== "undefined") ? e.target : e.srcElement;

				//console.log(target);
				// Filter out events of no interest.
				if(typeof filterOut === "function" && filterOut(target, e)){
					return;
				}

				// call worker to do actual work on click event, pass init object (that sets main tasks).
				if(init !== null){
					worker(target, init, e);
				}
				else{
					worker(target, e);
				}

				// Stop bubble.
				if (stopPropagation === true && typeof e.stopPropagation === "function"){
					e.stopPropagation();
				}

				// IE
				if (stopPropagation === true && typeof e.cancelBubble !== "undefined"){
					e.cancelBubble = true;
				};


				// prevent form from sending to server, everything is handled on the client.
				if(preventDefault === true && typeof e.preventDefault === "function"){
					e.preventDefault();
				}

				// IE.
				if(preventDefault === true && typeof e.returnValue !== "undefined"){
					e.returnValue = false;
				}
			};
		}
	};
	
	// facade and public API
	return{
		handler: function(args){
			var handlerSettings = {
				element: settings.element(args),
				eventType: settings.eventType(args),
				filterOut: settings.filterOut(args),
				init: settings.init(args),
				worker: settings.worker(args),
				useCapture: settings.useCapture(args),
				stopPropagation: settings.stopPropagation(args),
				preventDefault: settings.preventDefault(args)
			};
			

			var element = handlerSettings.element,
			eventType = handlerSettings.eventType,
			filterOut = handlerSettings.filterOut,
			worker = handlerSettings.worker,
			init = handlerSettings.init,
			useCapture = handlerSettings.useCapture,
			stopPropagation = handlerSettings.stopPropagation,
			preventDefault = handlerSettings.preventDefault;

			eventFunc.callback(element, eventType, filterOut, worker, init, useCapture, stopPropagation, preventDefault);
		}
	};
}());
