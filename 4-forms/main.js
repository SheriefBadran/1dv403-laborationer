'use strict';
window.onload = init;

function init(){

	var form = document.getElementById("form");
	var doc = document,
	errorIndicators = [],
	validationTypes = [],
	p = doc.createElement('p'),
	fields,
	noErrors,
	pTags = [];

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

	// If button is clicked.
	doc.body.addEventListener("click", function(e) {

		e = e || window.event;
		var target = (typeof e.target !== "undefined") ? e.target : e.srcElement;

		// filter out everything except button.
		if (target.id !== "button") {
			return;
		};

		// retrieve input fields.
		fields = doc.querySelectorAll("input");

		// Iterate through every field and validate.
		for (var i = 0; i < fields.length; i++) {
			if (fields[i].id !== "button" && fields[i].id !== "confirmButton") {
				errorIndicators[i] = validateField(fields[i].value, fields[i].id, fields[i].className);
				var p = doc.createElement('p');
				p.appendChild(doc.createTextNode(fields[i].className + ": " + fields[i].value));
				pTags[i] = p;
			}
		};
		
		noErrors = errorIndicators.reduce(function(isTrue, indicator, i){
			return isTrue && indicator === true;
		}, true);

		if(noErrors){
			confirmPurchase(pTags);
		}

		e.preventDefault();

	}, false);
};

function validateField(value, fieldID, className) {
	var doc = document;
	var field = document.getElementById(fieldID),
	errorMsgElement = field.nextSibling.nextSibling,
	errorMsgContent,
	value = value,
	fieldID = fieldID,
	className = className,
	validatedData;


	var dataObj = {};
	validator.config = {};

	// dynamically add a property name and it's value to the dataObj-object
	// DATA TO BE VALIDATED
	dataObj[className] = value;

	// dynamically add a property name and it's value to the config-object
	// CONFIGURATE VALIDATION TYPE
	validator.config[className] = className;

	// TRY VALIDATE FIELD DATA
	try {
		validatedData = validator.validate(dataObj);
	}
	catch(e) {
		console.log(e.name + " " + e.message);
	}

	// Convert valid post number format to 
	if (validatedData[0].swePostNum) {
		validatedData[0].swePostNum = validatedData[0].swePostNum.replace(/-/g, "");
		validatedData[0].swePostNum = validatedData[0].swePostNum.replace(/ /g, "");
		validatedData[0].swePostNum = validatedData[0].swePostNum.replace(/SE/g, "");

		document.getElementById(fieldID).value = validatedData[0].swePostNum;
	};

	// RETRIEVE ERROR MESSAGE AND DISPLAY IT TO THE USER
	if (validator.hasErrors()) {

		errorMsgContent = errorMsgElement.firstChild;

		// IF ERROR MESSAGE ALREADY EXISTS DON'T BOTHER CONTINUE
		if(errorMsgContent) {
			return errorMsgContent;
		}

		// CREATE ERROR MESSAGE AND DISPLAY IT
		var message = document.createTextNode(validator.messages);
		var p = document.createElement('p');
		p.appendChild(message);
		errorMsgElement.appendChild(p);
		errorMsgElement.className = "error";

		return validator.messages[0];
	};

	// IF ERROR IS CORRECTED REMOVE ERROR MESSAGE, IF NO ERROR - ASSURE CLASS NAME IS SET TO SUCCESS
	if (!validator.hasErrors()) {

		if (errorMsgElement.firstChild) {
			errorMsgElement.removeChild(errorMsgElement.firstChild);
			errorMsgElement.className = "success";
		};

		// If errormessages are displayed since blur validation.
		return true;
	};
};

var confirmPurchase = function(pTags) {
	
	// Declare needed variables
	var doc = document, popup, background, form, priseLevelList, priseLevel, priseData,

	// Create input tag for modal popup button
	input = doc.createElement('input'),

	// Create p tag for prise level data
	p = doc.createElement('p'),

	// Create data wrappper for modal popup
	div = doc.createElement('div'),

	// Create h2 tag for 
	h2 = doc.createElement('h2'),

	// Create text node for heading
	headingText = doc.createTextNode('Vänligen bekräfta ditt köp');

	div.setAttribute("class", "popupData");
	// Set attributes for modal popup button
	input.type = "submit";
	input.value = "Bekräfta Köp!";
	input.id = "confirmButton";
	input.className = "button success";

	// Retrieve modal popup
	popup = doc.querySelector("#myModal");

	// Retrieve modal background div
	background = doc.querySelector("#background");

	// confirmPurchase = function(errorIndicators, dataObj, pTags) {
	// }

	// Assamble html elements and render work
	h2.appendChild(headingText);
	div.appendChild(h2);

	// Iterate through p tags and append each of them to the popup box.
	for (var i = 0; i < pTags.length; i++) {
		div.appendChild(pTags[i]);
	};

	// Retrieve select drop menu
	priseLevelList = doc.querySelector("#priseLevelList");

	// Retrieve selected option value and print value in popup box.
	priseLevel = priseLevelList.options[priseLevelList.selectedIndex].value;
	priseData = doc.createTextNode(priseLevelList.name + ": " + priseLevel);
	p.appendChild(priseData);
	div.appendChild(p);

	div.appendChild(input);
	popup.appendChild(div);

	// Reveal modal popup box
	popup.setAttribute("class", "reveal-modal small modal_visible");
	background.setAttribute("class", "background_visible");

	form = document.getElementById("form");
	// Click event listener for closing popup box.
	doc.body.addEventListener("click", function(e){
		e = e || window.event;
		var target = (typeof e.target !== "undefined") ? e.target : e.srcElement;
		console.log(target);

		// If confirm button is clicked, send form.
		if (target.id === "confirmButton") {
			form.submit();
		}

		// filter out everything except closing "x" sybol and modal background area.
		if (target.className !== "close-reveal-modal" && target.id !== "background") {
			return;
		};

		// Hide modal popup box
		popup.setAttribute("class", "reveal-modal small");
		background.setAttribute("class", "background");

		popup.removeChild(div);
		
	}, false);
}
