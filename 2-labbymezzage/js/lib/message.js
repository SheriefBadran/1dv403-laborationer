'use strict';

// Default initialization of LABBY
var LABBY = LABBY || {};

// Initialization adapted for jshint
// var LABBY = {};

// !! jshint STOPS COMPLAINING IF LABBY GLOBAL IS DELETED FROM jshint's JSON CONFIG FILE IN
//(node_modules/grunt-contrib-jshint) !!

// namespace functionality taken from the book javascript patterns.
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
};

// Define namespace for Message module
LABBY.namespace('Chat');

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

LABBY.Chat = (function()
{
	// dependencies: none
	
	// PRIVATE PROPERTIES

	
	// optionally one-time init procedures: none
	
	// PUBLIC API
		
	var Message = function(message, date){

		this.getText = function(){
			return message;
		};

		this.setText = function(_text){
			message = _text;
		};

		this.getDate = function(){
			return date;
		};

		this.setDate = function(_date){
			date = _date;
		};
	};

	// prototype object
	Message.prototype = {
		// Constructor Functions
		toString: function(){
			return this.getText()+" ("+this.getDate()+")";
		},

		getHTMLText: function(){

		}

	};

	var MessageStorage = function(){
		var messages = [];
		var fragments = [];

		this.storeMessage = function(messageRef){
			messages.push(messageRef);
			//messageRef.setMessage(messageObj);
		};

		this.getMessage = function(index){
			return messages[index];
		};

		this.getAllMessages = function(){
			return messages;
		};

		this.getFragments = function(){
			return fragments;
		};
	};

	MessageStorage.prototype = {
		RenderMessage: function(messageID){
			var doc = document, section, div, spanEdit, spanDelete, spanDate, p, spanTime,
			frag = doc.createDocumentFragment();

			section = doc.createElement('section');
			div = doc.createElement('div');
			spanEdit = doc.createElement('span');
			spanDelete = doc.createElement('span');
			spanDate = doc.createElement('span');
			p = doc.createElement('p');
			p.innerHTML = this.getMessage(messageID);
			spanTime = doc.createElement('span');
			//t = doc.createTextNode(text);

			section.className = 'row';
			div.className = 'message small-6 small-centered columns';
			div.id = messageID.toString();
			p.className = 'text columns';



			section.appendChild(div);
			div.appendChild(spanEdit);
			div.appendChild(spanDelete);
			div.appendChild(spanDate);
			div.appendChild(p);
			div.appendChild(spanTime);
			//p.appendChild(t);
			frag.appendChild(section);
			return frag;
		},

		RenderMessages: function(){

			var messageObjects = this.getAllMessages();

			for (var i = 0, max = messageObjects.length; i < max; i++) {
				this.getFragments()[i] = this.RenderMessage(i);
			}

			return this.getFragments();
		}
	};

	// return the constructor to be assigned to the new namespace
	return { Message: Message, MessageStorage: MessageStorage };
}());