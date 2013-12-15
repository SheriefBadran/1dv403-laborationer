'use strict';
window.onload = init;

function init(){

	var doc = document;

	// Field onblur
	doc.body.addEventListener("blur", function(e) {
		e = e || window.event;
		var target = (typeof e.target !== "undefined") ? e.target : e.srcElement;

		// filter out everything except form fields input
		if (target.tagName.toLowerCase() !== "input" || target.id === "button" 
		|| target.tagName.toLowerCase() === "select") {

			return;
		};

		// Validate field value.
		validateField(target.value, target.id, target.className);

	}, true);

	// If button is clicked
	doc.body.addEventListener("click", function(e) {

		e = e || window.event;
		var target = (typeof e.target !== "undefined") ? e.target : e.srcElement;

		// filter out everything except button
		if (target.id !== "button") {
			return;
		};

		var fields = doc.querySelectorAll("input");
		console.log(fields);

		for (var i = 0; i < fields.length; i++) {
			if (fields[i].id !== "button") {
				validateField(fields[i].value, fields[i].id, fields[i].className);
			}

			// PREVENT DEFAULT IS ALWAYS EXCECUTED!!!!
			// prevent form from sending to server, everything is handled on the client.
			if(e.preventDefault && typeof e.preventDefault === "function") {
				e.preventDefault();
			}

			// IE.
			if(!e.preventDefault && typeof e.returnValue !== "undefined") {
				e.returnValue = false;
			}
		};



	}, false);
};

function validateField(value, fieldID, className) {

	var field = document.getElementById(fieldID),
	errorMsgElement = field.nextSibling.nextSibling,
	value = value, 
	fieldID = fieldID, 
	className = className,

	fieldData = {};
	validator.config = {};

	// dynamically add a property name and it's value to the fieldData-object
	// DATA TO BE VALIDATED
	fieldData[className] = value;

	// dynamically add a property name and it's value to the config-object
	// CONFIGURATE VALIDATION TYPE
	validator.config[className] = className;

	// TRY VALIDATE FIELD DATA
	try {
		validator.validate(fieldData);
	}
	catch(e) {
		console.log(e.name + " " + e.message);
	}
	

	// RETRIEVE ERROR MESSAGE AND DISPLAY IT TO THE USER
	if (validator.hasErrors()) {

		var errorMsgContent = errorMsgElement.firstChild;

		// IF ERROR MESSAGE ALREADY EXISTS DON'T BOTHER CONTINUE
		if(errorMsgContent) {
			return;
		}

		// CREATE ERROR MESSAGE AND DISPLAY IT
		var message = document.createTextNode(validator.messages);
		var p = document.createElement('p');
		p.appendChild(message);
		errorMsgElement.appendChild(p);
		errorMsgElement.className = "error";
	};

	// IF ERROR IS CORRECTED REMOVE ERROR MESSAGE, IF NO ERROR - ASSURE CLASS NAME IS SET TO SUCCESS
	if (!validator.hasErrors()) {

		if (errorMsgElement.firstChild) {
			errorMsgElement.removeChild(errorMsgElement.firstChild);
			errorMsgElement.className = "success";
		};
	}
}
