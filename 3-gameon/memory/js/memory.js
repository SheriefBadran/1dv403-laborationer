function Memory(){};

Memory.prototype.createMemoryBoard = function(div){

	var fragment = document.createDocumentFragment();
	var selectWrapper = div;
	var selectDiv = document.createElement('div');
	var selectElement = document.createElement('select');
	var defaultOptionElement = document.createElement('option');
	var optionElement = document.createElement('option');

	selectWrapper.className = 'row select';
	selectDiv.className = 'large-4 columns';
	selectElement.className = 'memoryRows';

	defaultOptionElement.disabled = 'true';
	defaultOptionElement.selected = 'true';
	defaultOptionElement.innerHTML = 'Select Rows';

	optionElement.className = 'rowValue';

	selectDiv.appendChild(selectElement);

	var i;
	for(i = 0; i < 9; i+=1){
		if(i === 0){
			selectDiv.firstChild.appendChild(defaultOptionElement);
		}
		else{
			selectDiv.firstChild.appendChild(optionElement.cloneNode());
		}
		
	};

	var optionElements = selectDiv.firstChild.childNodes;

	for(var i = 0; i < optionElements.length; i+=1){
		switch(i){
			case 0:
				break;
			case 1:
				console.log(optionElements[i]);
				optionElements[i].value = "2x2";
				optionElements[i].innerHTML = "2x2";
				break;
			case 2:
				optionElements[i].value = "2x3";
				optionElements[i].innerHTML = "2x3";
				break;
			case 3:
				optionElements[i].value = "3x2";
				optionElements[i].innerHTML = "3x2";
				break;
			case 4:
				optionElements[i].value = "2x4";
				optionElements[i].innerHTML = "2x4";
				break;
			case 5:
				optionElements[i].value = "2x4";
				optionElements[i].innerHTML = "2x4";
				break;
			case 6:
				optionElements[i].value = "4x2";
				optionElements[i].innerHTML = "4x2";
				break;
			case 7:
				optionElements[i].value = "3x4";
				optionElements[i].innerHTML = "3x4";
			case 8:
				optionElements[i].value = "4x3";
				optionElements[i].innerHTML = "4x3";
				break;
			case 9:
				optionElements[i].value = "4x4";
				optionElements[i].innerHTML = "4x4";
		}
	};

	selectWrapper.appendChild(selectDiv);

	return selectWrapper;
};

Memory.prototype.trigEvents = function(memory, id){

	var observer = MEDIATOR.core.observer;
	var that = this;
	var gameWrapper = document.getElementById(id);

	var Event = WEBAPP.utilities.handleEvent;
	// create settings object for event handler triggered with row number choice.
	var eventObject = {
		element: gameWrapper,
		eventType: "click",
		filterOut: function(target, e){
			if(target.tagName.toLowerCase() !== "option" || target.hasAttribute('selected') 
			|| target.className !== 'rowValue'){

				return true;
			}
			return false;
		},
		worker: function(target, e){

			var rowsAndColumns = target.value;

			// try publish rows and columns retrieved from user
			try{
				observer.publish({ rowsAndColumns: rowsAndColumns, memory: memory, id: id });

				// unsubscribe renderRowsAndColumns to publish only once next time function is called.
				observer.unsubscribe(renderRowsAndColumns);
			}
			catch(e){
				console.log(e.message);
			}
		}, 
		useCapture: false, stopPropagation: true, preventDefault: true
	};

	Event.handler(eventObject);
};

Memory.prototype.renderRows = function(rows){
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
};

Memory.prototype.renderColumns = function(frag, cols, id){

	var imagePackage = {};

	console.log("render " + cols + " columns.");

	console.log(frag.childNodes);

	// Retrieve game wrapper and a referens element for later insertion.
	var doc = document;
	var gameWrapper = document.getElementById(id);
	var referenceElement = doc.querySelector(".selectRows");

	// Create column html.
	var div = doc.createElement('div');
	var img = doc.createElement('img');

	// Set foundation class attributes with respect to cols.
	if(cols <= 4){
		div.className = "large-2 columns";
	}
	else if(cols > 4){
		div.className = "large-1 columns";
	}

	// Set attributes for img tags.
	img.src = "css/0.png";
	img.className = "image";
	img.height = "24";
	img.width = "24";
	img.alt = "hidden";

	div.appendChild(img);

	// Iterate through every row. For each row, iterate as many times as number of columns
	// and render all columns to each row.

	var rowDivs = []
	var rows = frag.childNodes.length;
	var i;
	for(i = 0; i < rows; i+=1){

		var j;
		for (j = 0; j < cols; j+=1){
			frag.childNodes[i].firstChild.appendChild(div.cloneNode());
			// rowDivs.push(frag.querySelectorAll(".image"));
		};
	};
	var images = frag.querySelectorAll(".image");

	// Insert rendered html with rows and columns before the reference element 
	// within the game wrapper.
	// gameWrapper.insertBefore(frag, referenceElement);
	gameWrapper.appendChild(frag);

	imagePackage.images = images;
	imagePackage.rows = rows;
	imagePackage.cols = cols;
	imagePackage.frag = frag;

	// return the final document fragment for the game.
	return imagePackage; 

};

Memory.prototype.playGame = function(imagePackage, gameWrapper){

	var rows = imagePackage.rows;
	var columns = imagePackage.cols;
	var images = imagePackage.images;
	var gameWrapper = gameWrapper;


	var randomNumberArray = this.getPictureArray(rows, columns);

	var randomImageArray = randomNumberArray.map(function(number, index){
		return number.toString() + ".png";
	});

	var secretImages = splitUp(randomImageArray, rows);

	// convert html-collection to an array with images.
	var startImages = [];
	for (var i = 0; i < images.length; i++) {
		startImages.push(images[i]);
	};

	var shownImages = splitUp(startImages, rows);

	console.log(secretImages);
	console.log(shownImages);

	gameWrapper.addEventListener("click", flip, false);

	//Declare globals for flip event handler function
	var firstShownImage;
	var secondShownImage;
	var reflipImage;
	var count = 0;
	// var nrOfTry;

	function flip(e){
		var target = e.target;
		count++;
		// if(count > 2){
		// 	count = 0;
		// }

		var i;
		for(var i = 1; i < shownImages.length + 1; i+=1){

			var j;
			for(j = 1; j < shownImages[i-1].length + 1; j+=1) {
				// shownImages[i-1][j-1].alt = "hidden";
				if(count <= 2){
					if(target === shownImages[i-1][j-1]){

						if(count === 1 && target.alt === "hidden"){
							target.src = "css/" + secretImages[i-1][j-1];
							firstShownImage = target;
							console.log(firstShownImage.src);
						}

						if(count === 2 && target.alt === "hidden"){
							target.src = "css/" + secretImages[i-1][j-1];
							secondShownImage = target;
							console.log(secondShownImage.src);

							reflipImage = setTimeout(function(){
								firstShownImage.src = "css/0.png";
								secondShownImage.src = "css/0.png";
								count = 0;
							}, 1000);
						}

						if(secondShownImage && firstShownImage.src === secondShownImage.src && 
							firstShownImage !== secondShownImage){

							firstShownImage.alt = "found";
							secondShownImage.alt = "found";
							clearTimeout(reflipImage);
							// shownImages[i][j].filter()
							count = 0;
						}
					}
				}
			}
		}
	};


	// Reference: http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
	function splitUp(arr, n) {
	    var rest = arr.length % n, // how much to divide
	        restUsed = rest, // to keep track of the division over the elements
	        partLength = Math.floor(arr.length / n),
	        result = [];

	    for(var i = 0; i < arr.length; i += partLength) {
	        var end = partLength + i,
	            add = false;

	        if(rest !== 0 && restUsed) { // should add one element for the division
	            end++;
	            restUsed--; // we've used one division element now
	            add = true;
	        }

	        result.push(arr.slice(i, end)); // part of the array

	        if(add) {
	            i++; // also increment i in the case we added an extra element for division
	        }
	    }

	    return result;
	};
};

Memory.prototype.getPictureArray = function(rows, cols)
{
	var numberOfImages = rows*cols;
	var maxImageNumber = numberOfImages/2;

   	var imgPlace = [];

   //Utplacering av bilder i Array
   for(var i=0; i<numberOfImages; i++)
	  imgPlace[i] = 0;

	for(var currentImageNumber=1; currentImageNumber<=maxImageNumber; currentImageNumber++)
	{		
		var imageOneOK = false;
		var imageTwoOK = false;
		
		do
		{
			if(imageOneOK == false)
			{
				var randomOne = Math.floor( (Math.random() * (rows*cols-0) + 0) );				
				
				if( imgPlace[randomOne] == 0 )
				{
					imgPlace[randomOne] = currentImageNumber;
					imageOneOK = true;
				}
			}
			
			if(imageTwoOK == false)
			{
				var randomTwo = Math.floor( (Math.random() * (rows*cols-0) + 0) );				
							
				if( imgPlace[randomTwo] == 0 )
				{
					imgPlace[randomTwo] = currentImageNumber;
					imageTwoOK = true;
				}
			}			
		}
		while(imageOneOK == false || imageTwoOK == false);		
	}
	
	return imgPlace;
};



