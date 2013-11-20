/*!
*	This liberary is built according to the module pattern. 
*	The name of the global namespace object and library is WEBAPP.
*/

// setting up a namespace
var Message = Message || {};

Message.namespace = function(ns_string)
{
	var parts = ns_string.split('.'),
	parent = Message,
	i;
	
	if(parts[0] === "Message")
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
Message.namespace('utilities.menues');

// CREATES XMLHttpRequestObject AND MANAGE AJAX CALLS
Message.namespace('xhr');


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
Message.xhr = (function()
{
	// private properties
	var settings = 
	{
		url: function(obj)
		{

		},
		
		contentType: function(obj)
		{

		},
		
		type: function(obj)
		{

		},
		
		data: function(obj)
		{

		},
		
		success: function(obj)
		{

		},
		
		complete: function(obj)
		{

		},
		
		async: function(obj)
		{

		},
		
		showErrors: function(obj)
		{

		},
		
		error: function(obj)
		{

		}
	},
	
	xhrFunctions = 
	{
		createXmlHttp: function()
		{

		},
		
		readResponse: function(xhr, onsuccess)
		{

		},
		
		handleRequestStateChange: function(xhr, rscParam)
		{	

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

		}
	};
}());

