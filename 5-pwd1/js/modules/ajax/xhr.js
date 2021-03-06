/*!
*	This liberary is built according to the module pattern. 
*	The name of the global namespace object and library is AJAX.
*/

// setting up a namespace
var AJAX = AJAX || {};

AJAX.namespace = function(ns_string)
{
	var parts = ns_string.split('.'),
	parent = AJAX,
	i;
	
	if(parts[0] === "AJAX")
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
AJAX.namespace('xhr');


// AJAX MODULE
/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @author Sherief Badran <sherief.badran@sparklingcloud.com>
 * @namespace AJAX.xhr
 * @class xhr
 * @call AJAX.xhr.ajax(args)
 * @param {[Object]} [args] ...
 * [url: "string", Content-Type: "string", type: "string", data: "string", complete: function(), async: boolean(true or false), showErrors: boolean(true or false)]
 */

AJAX.xhr = (function()
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
					// console.log(response);
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
		makeCall: function(args)
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
var Ajax = AJAX.xhr;