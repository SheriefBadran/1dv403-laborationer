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

	// array to hold messages
	var messages = [];
	
	// private methods

	var _setMessage = function(messageObj){
		messages.push(messageObj);
	}

	var _getMessage = function(index){
		return messages[index];
	}

	var _user = function(name, messageObj){
		// FIRST EXPERIMENT
		// this.name = name;
		// this.message = messageObj.message;
		// this.date = messageObj.date;

		// SECOND EXPERIMENT
		// return {
		// 	name: name,
		// 	message: messageObj.text,
		// 	date: messageObj.date
		// };

		//THIRD EXPERIMENT
		this.name = name;
		this.message = messageObj.text;
		this.date = messageObj.date;
	}
	
	// optionally one-time init procedures: none
	
	// PUBLIC API
		
	Constr = function(messageObj){
		// So far empty "abstract" constructor
		//console.log(messageObj);
	};

	// prototype object
	Constr.prototype = {
		// Constructor Functions

		user: function(name, messageObj){
			// FIRST EXPERIMENT
			// this.setMessage = _setMessage;
			// this.getMessage = _getMessage;

			// SECOND EXPERIMENT
			// var userObj = _user(name, messageObj);
			// this.name = userObj.name;
			// this.message = userObj.message;
			// this.date = userObj.date;

			// THIRD EXPERIMENT
			return this.User = _user;
		},

		// Privileged Constructor function that returns a reference to private method
		setMessage: function(obj){
			// _setMessage(obj);
			return this.SetMessage = _setMessage;
		},
		
		// Privileged Constructor function that returns a reference to private method
		getMessage: function(index){
			//return _getMessage(index);
			return this.GetMessage = _getMessage;
		}
	};

	// return the constructor to be assigned to the new namespace
	return Constr;
}());