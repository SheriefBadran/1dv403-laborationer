'use strict';

// Inspiration and pattern taken from javascript patterns.
var validator = {

	// all checks
	validationTypes: {},

	// error messages in the current validation session
	messages: [],

	validatedData: [],

	validatedDataObj: {},

	// current validation config
	// name: validation type
	config: {},

	validate: function (data) {
		var i, msg, validationType, checker, approvedResult;

		// Reset messages, validatedData and validatedDataObj.
		this.messages = [];
		this.validatedData = [];
		this.validatedDataObj = {};

		for (i in data) {
			if (data.hasOwnProperty(i)) {
				console.log(data[i]);
				// Initialize type with validation types set to config object.
				validationType = this.config[i];

				// if validationType object contains implemented validation rule corresponding to validation type 
				// and initialize to checker.
				checker = this.validationTypes[validationType];

				// if validation type is not set, continue with next loop.
				if (!validationType) {
					continue;
				};

				// if checker doesn't contain validation rule object corresponding to validation type, 
				// throw an error.
				if (!checker) {
					throw{
						name: "ValidationError",
						message: "No handler to validate type " + validationType
					};
				};

				// validate data value through validation rool object.
				approvedResult = checker.validate(data[i]);

				if (!approvedResult) {

					// Initialize msg through validation rool object's property value
					msg = checker.instructions;
					this.messages.push(msg);

					this.validatedDataObj[i] = false;
					this.validatedData.push(this.validatedDataObj);
				};

				if (approvedResult) {
					this.validatedDataObj[i] = data[i];
					this.validatedData.push(this.validatedDataObj);
				};
			};
		}
		return this.validatedData;
	},

	// returns true if error exists
	hasErrors: function () {
		return this.messages.length !== 0;
	}
};


// Implement validation rool objects
validator.validationTypes.notEmpty = {

	validate: function(value){
		return value !== "";
	},

	instructions: "Fältet får inte vara tomt."
};

validator.validationTypes.firstName = {

	validate: function(value){
		return value !== "" && value.match(/^[a-zA-Z]+$/);
	},

	instructions: "Ange ett giltigt förnamn (endast bokstäver)."
};

validator.validationTypes.lastName = {
	validate: function(value){
		return value !== "" && value.match(/^[a-zA-Z]+$/);
	},

	instructions: "Ange ett giltigt efternamn (endast bokstäver)."
};

validator.validationTypes.swePostNum = {
	validate: function(value){

		return value !== "" && value.match(/^\d{5}$/) || value.match(/^\d{3}[- ]\d{2}$/)

		|| value.match(/^[SE]+\d{3}[- ]\d{2}$/) || value.match(/^[SE]+\d{5}$/) || value.match(/^[SE]+[ ]+\d{5}$/)

		|| value.match(/^[SE]+[ ]\d{3}[- ]\d{2}$/);
	},

	instructions: "Ange ett giltigt postnummer (xxxxx)."
};

validator.validationTypes.Email = {
	validate: function(value){
		return value !== "" && value.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);
	},

	instructions: "Ange en giltig E-post adress."
};