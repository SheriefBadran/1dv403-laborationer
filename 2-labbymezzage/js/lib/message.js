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
	
	for(i=0; i<parts.length; i++)
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

		var date = new Date();

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

		this.getTime = function(){
			return date.toString().split(" ")[4];
		};
	};

	// prototype object
	Message.prototype = {
		toString: function(){
			return this.getText();
		}
	};

	var MessageStorage = function(){
		var messages = [];
		var fragments = [];

		this.storeMessage = function(messageRef){
			messages.push(messageRef);
		};

		this.getMessage = function(index){
			return messages[index];
		};

		this.getHTMLMessage = function(index){
			return messages[index].getText().replace(/[\n\r]/g, "<br />");
		}

		this.getAllMessages = function(){
			return messages;
		};

		this.getFragments = function(){
			return fragments;
		};

		this.deleteMessage = function(index){
			messages.splice(index, 1);
		}
	};

	MessageStorage.prototype = {
		RenderMessage: function(messageID){
			var doc = document, section, divUpper, divMiddle, divLower, spanEdit, spanDelete, spanDate, spanTime, pMessage,
			pEdit, pDelete, pDate, pTime,
			frag = doc.createDocumentFragment();

			section = doc.createElement('section');
			divUpper = doc.createElement('div');
			divMiddle = doc.createElement('div');
			divLower = doc.createElement('div');
			spanEdit = doc.createElement('span');
			spanDelete = doc.createElement('span');
			spanDate = doc.createElement('span');
			pEdit = doc.createElement('p');
			pDelete = doc.createElement('p');
			pDate = doc.createElement('p');
			pMessage = doc.createElement('p');
			pMessage.innerHTML = this.getHTMLMessage(messageID);
			spanTime = doc.createElement('span');
			spanTime.innerHTML = this.getMessage(messageID).getTime();
			pTime = doc.createElement('p');

			section.className = "message large-8 large-centered columns";
			section.id = messageID.toString();
			divUpper.className = 'row';
			divMiddle.className = 'row';
			divLower.className = 'row';
			spanEdit.className = "edit";
			spanDelete.className = "delete";
			spanDate.className = "date";
			spanTime.className = "time";
			pMessage.id = "pMessage";
			pMessage.className = "large-12 columns";
			pEdit.className = "pedit large-1 columns";
			pDelete.className = "pdelete large-1 columns";
			pDate.className = "pdate large-1 columns";
			pDate.id = "calendar";
			pTime.className = "ptime large-12 columns";

			pEdit.appendChild(spanEdit);
			pDelete.appendChild(spanDelete);
			pDate.appendChild(spanDate);
			pTime.appendChild(spanTime);
			divUpper.appendChild(pDate);
			divUpper.appendChild(pEdit);
			divUpper.appendChild(pDelete);
			divMiddle.appendChild(pMessage);
			divLower.appendChild(pTime);
			section.appendChild(divUpper);
			section.appendChild(divMiddle);
			section.appendChild(divLower);
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