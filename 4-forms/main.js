window.onload = init;

function init(){

	var doc = document;

	var firstName = doc.querySelector("#firstname");
	firstName.focus();

	firstName.onblur = function () {
		validate(this.value, this.id, this.className);
	};

	var lastName = doc.querySelector("#lastname");
	lastName.onblur = function(){
		validate(this.value, this.id, this.className);
	};

	var postNumber = doc.querySelector("#postnumber");
	postNumber.onblur = function(){
		validate(this.value, this.id, this.className);
	};

	var email = doc.querySelector("#email");
	email.onblur = function(){
		validate(this.value, this.id, this.className);
	};
};

function validate(value, fieldID, className){
	var field = document.getElementById(fieldID);
	var errorField = field.nextSibling.nextSibling;
	var value = value, fieldID = fieldID, className = className;
	console.log(value);
	console.log(fieldID);
	console.log(className);

	switch(className){

		case "notEmpty":
			sendDataToValidator();
			break;

		case "name":
			sendDataToValidator();
			break;

		case "isSwePostNum":
			// code
			break;

		case "isEmail":
			// code
			break;
	}

	function sendDataToValidator() {
		// body...
		var data = {};
		validator.config = {};

		// dynamically add a property name and it's value to the data-object
		data[className] = value;

		// dynamically add a property name and it's value to the config-object
		validator.config[className] = className;

		console.log(data);
		console.log(validator.config);

		validator.validate(data);

		if (validator.hasErrors()) {
			var message = document.createTextNode(validator.messages);
			var p = document.createElement('p');
			p.appendChild(message);
			errorField.appendChild(p);
			errorField.className = "error";

			console.log(message);
			console.log(errorField);
		};
	}

	// var data = {
	// 	notEmpty: ''
	// };

	// validator.config = {
	// 	notEmpty: 'notEmpty'
	// };

	// validator.validate(data);

	// if (validator.hasErrors()) {
	// 	console.log(validator.messages.join("\n"));
	// };
}
