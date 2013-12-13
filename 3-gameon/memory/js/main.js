
window.onload = init;

function init(){
	var observer = MEDIATOR.core.observer;
	var memoryStorage = new MemoryStorage;
	var Event = WEBAPP.utilities.handleEvent;

	observer.makePublisher(renderRowsAndColumns);
	observer.subscribe(startGame, "renderRowsAndColumns");

	document.body.addEventListener("click", function(e){

		if(e.target.className === "newgame"){
			renderBoard(memoryStorage, observer);
		}
		
	}, false);

	// Event.handler(buttonEventObj);
};

var renderBoard = function(memoryStorage, observer){
	var currentMemory;
	var id = memoryStorage.getMemoryGameID();
	var div = document.createElement('div');
	div.id = id;

	var memory = new Memory();

	memoryStorage.setMemoryGame(memory);
	currentMemoryGame = memoryStorage.getCurrentMemoryGame(memory);

	observer.makePublisher(currentMemoryGame.trigEvents);
	observer.subscribe(renderRowsAndColumns);

	// create a memoryboard
	var selectWrapper = currentMemoryGame.createMemoryBoard(div);
	var board = document.querySelector('#games');
	board.appendChild(selectWrapper);

	currentMemoryGame.trigEvents(currentMemoryGame, id);
}

var renderRowsAndColumns = function(memoryObj){
	console.log(typeof memoryObj === "object"); // expect true
	console.log(typeof memoryObj.id === "string"); // true
	console.log(typeof memoryObj.rowsAndColumns === "string");

	if(typeof memoryObj === "object" && typeof memoryObj.id === "string" 
	&& typeof memoryObj.rowsAndColumns === "string"){

		// INIT WORK
		var observer = MEDIATOR.core.observer;
		var rowsAndColumns = [];
		var rows;
		var columns;

		var id = memoryObj.id;
		console.log(id);
		var currentMemoryGame = memoryObj.memory;

		var frag;
		var imagePackage;
		var gameWrapper = document.getElementById(id);

		rowsAndColumns = memoryObj.rowsAndColumns.split("x");

		rows = parseInt(rowsAndColumns[0]);
		columns = parseInt(rowsAndColumns[1]);

		// ACTUAL WORK
		frag = currentMemoryGame.renderRows(rows);

		imagePackage = currentMemoryGame.renderColumns(frag, columns, id);

		startGame(currentMemoryGame, imagePackage, gameWrapper);
	}
	else{
		throw {message: "Error: Argument has to be an object"};
	}

};

var startGame = function(currentMemoryGame, imagePackage, gameWrapper){

	currentMemoryGame.playGame(imagePackage, gameWrapper);
};

