var validator = {

	// all checks
	types: {},

	// error messages in the current validation session
	messages: [],

	// current validation config
	// name: validation type
	config: {},

	validate: function (data) {
		var i, msg, type, checker, result_ok;

		// reset messages
		this.messages = [];

		for (i in data) {
			if (data.hasOwnProperty(i)) {
				type = this.config[i];
				checker = this.types[type];

				if (!type) {
					continue;
				};

				if (!checker) {
					throw{
						name: "ValidationError",
						message: "No handler to validate type " + type
					};
				};

				result_ok = checker.validate(data[i]);
				if (!result_ok) {
					// msg = "Invalid value for *" + i + "*, " + checker.instructions;
					msg = checker.instructions;
					this.messages.push(msg);
				};
			};
		}
		return this.hasErrors();
	},

	//helper
	hasErrors: function () {
		return this.messages.length !== 0;
	}
};


// Implement validator
validator.types.notEmpty = {

	validate: function(value){
		return value !== "";
	},

	instructions: "Fältet får inte vara tomt."
};

validator.types.name = {

	validate: function(value){
		return value !== "" && value.match(/^[a-zA-Z]+$/);
	},

	instructions: "Ange giltigt förnamn (endast bokstäver)."
};