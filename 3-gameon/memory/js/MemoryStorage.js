function MemoryStorage(){
	var that = this;
	var memoryGames = [];

	this.setMemoryGame = function(memoryObj){
		memoryGames.push(memoryObj);
	};

	this.getMemoryGame = function(index){
		return memoryGames[index];
	};

	this.getAllMemoryGames = function(){
		return memoryGames;
	};

	this.getMemoryGameID = function(){
		return memoryGames.length.toString();
	};

	this.getCurrentMemoryGame = function(memory){
		var memoryGames = that.getAllMemoryGames(),
		currentMemoryGame;

		currentMemoryGame = memoryGames.filter(function(memoryGame){
			return memory === memoryGame;
		});

		return currentMemoryGame[0];
	};
};