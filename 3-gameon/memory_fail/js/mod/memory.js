define(["mod/memory", "observer/publisher"],function(memory, observer){

	return{
		renderRows: function(rows){

			console.log("render " + rows + " rows.");

			var doc = document;
			var frag = doc.createDocumentFragment();

			var row = doc.createElement('div');
			var div = doc.createElement('div');

			row.className = 'row';
			div.className = 'large-4 large-centered columns';

			row.appendChild(div);


			var i;
			for(i = 0; i < rows; i++){
				frag.appendChild(row.cloneNode());
			};

			// return the document fragment containing html for the rows.
			return frag;
		},
		renderColumns: function(arg){

			// This function subscribes to the rows - eventhandler and receives a published 
			// document-fragment object containing html for number of rows. 
			// It is done by loose coupling comunication.
			if(typeof arg === "object"){

				// Save document-fragment object as a function property
				this[0].frag = arg;
				console.log(this[0]);
			}
			
			// This function also receives a string from the columns - eventhandler. The string
			// is parsed to a number that gives number of columns.
			if(typeof arg === "string"){

				var imagePackage = {};

				columnNumber = parseInt(arg);
				console.log("render " + columnNumber + " columns.");
				
				var frag = this.renderColumns.frag;

				console.log(frag.childNodes);

				// Retrieve game wrapper and a referens element for later insertion.
				var doc = document;
				var gameWrapper = doc.querySelector("#game1");
				var referenceElement = doc.querySelector(".firstSelect");

				// Create column html.
				var div = doc.createElement('div');
				var img = doc.createElement('img');

				// Set foundation class attributes with respect to columnNumber.
				if(columnNumber <= 4){
					div.className = "large-2 columns";
				}
				else if(columnNumber > 4){
					div.className = "large-1 columns";
				}

				// Set attributes for img tags.
				img.src = "css/0.png";
				img.className = "image";
				img.height = "24";
				img.width = "24";

				div.appendChild(img);

				// Iterate through every row. For each row, iterate as many times as number of columns
				// and render all columns to each row.

				var rowDivs = []
				var rows = frag.childNodes.length;
				var i;
				for(i = 0; i < rows; i+=1){

					var j;
					for (j = 0; j < columnNumber; j+=1){
						frag.childNodes[i].firstChild.appendChild(div.cloneNode());
						rowDivs.push(frag.querySelector(".image"));
					};
					
				};

				// Insert rendered html with rows and columns before the reference element 
				// within the game wrapper.
				gameWrapper.insertBefore(frag, referenceElement);

				imagePackage.images = rowDivs;
				imagePackage.rows = rows;
				imagePackage.cols = columnNumber;

				observer.publish(imagePackage);
				// return the final document fragment for the game.
				return frag; 
			}
		}
	};
});