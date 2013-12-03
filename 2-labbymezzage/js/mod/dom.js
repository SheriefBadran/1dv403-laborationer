define(["mod/dom"],function(){
	return{
		printMessages: function(doc, storage, Message, count, counterData){
			var messageSection = doc.querySelector('#messageSection');
			var counterBoxSection = doc.querySelector("#counter");
			// var counterData = doc.createTextNode("Antal Meddelanden: 0");
			var input = doc.querySelector("#message");

			console.log(storage);
			// variables for worker function
			var frag;

			// Create a new Message reference/object and sore it in the MessageStorage class.
			storage.storeMessage(new Message(input.value, new Date()));

			frag = storage.RenderMessage(count);
			messageSection.appendChild(frag);
			input.value = "";

			// Replace and update counter data.
			counterData.nodeValue = "Antal meddelanden: " + (count + 1).toString();
			counterBoxSection.appendChild(counterData);

			return frag;
		},
		createElements: function(){
			// implement
			
			return{
				var1: "temp",
				var2: "temp"
			};
		}
	};
});