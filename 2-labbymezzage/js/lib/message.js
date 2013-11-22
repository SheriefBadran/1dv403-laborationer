// Object.defineProperty(this, "name", {
// 	get: 
// 	set:
// });

var LABBY = LABBY || {};

LABBY.namespace = function(ns_string)
{
	var parts = ns_string.split('.'),
	parent = LABBY,
	i;
	
	if(parts[0] === "LABBY")
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

// Define namespace for Message module
LABBY.namespace('mezzage.Message');

// MESSAGE MODULE
/**
 * Create constructors for message web application.
 * @author Sherief Badran <sb222rf@student.lnu.se>
 * @namespace LABBY.mezzage.Message
 * @class Message
 * @call LABBY.mezzage.Message()
 * @param {[Object]} [args] ...
 * []
 */

LABBY.mezzage.Message = (function()
{
	// dependencies: none
	
	// PRIVATE PROPERTIES

	
	// optionally one-time init procedures: none
	
	// PUBLIC API
		
	Message = function(messageObj){
		var messages = [];

		this.setMessage = function(messageObj){
			
			if(typeof messageObj !== "object"){
				throw { message: "Error! Argument has to be of type object"}
			}

			messages.push(messageObj);
		};

		this.getMessage = function(index){
			return messages[index];
		};
	};

	// prototype object
	Message.prototype = {
		// Constructor Functions
		getVar1: function(){
			return this.var1;
		}
	};

	User = function(name){
		this.name = name;
	}

	User.prototype = {
		toString: function(){
			return "string";
		}
	};

	// return the constructor to be assigned to the new namespace
	return { Message: Message, User: User };
}());