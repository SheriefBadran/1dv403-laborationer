'use strict';
var publisher = {
	subscribers: {
		//event type: subscribers
		any: [] 
	},
	subscribe: function(fn, type){
		type = type || 'any';
		if(typeof this.subscribers[type] === "undefined"){
			this.subscribers[type] = [];
		}
		this.subscribers[type].push(fn);
	},
	unsubscribe: function(fn, type){
		this.visitSubscribers('unsubscribe', fn, type);
	},
	publish: function(publication, type){
		this.visitSubscribers('publish', publication, type);
	},
	visitSubscribers: function(action, arg, type){
		var pubtype = type || 'any',
		subscribers = this.subscribers[pubtype],
		i,
		max = subscribers.length;

		for(i=0; i<max; i+=1){
			if(action === 'publish'){
				subscribers[i](arg);
			}
			else{
				if(subscribers[i] === arg){
					subscribers.splice(i, 1);
				}
			}
		}
	}
};


function makePublisher(o){
	var prop;
	for(prop in publisher){
		if (publisher.hasOwnProperty(prop) && typeof publisher[prop] === "function"){
			o[prop] = publisher[prop];
		}
	}
	o.subscribers = {any: []};
}

// var paper = {
// 	daily: function(){
// 		this.publish("big news today");
// 	},
// 	monthly: function(){
// 		this.publish("interesting analysis", "monthly");
// 	}
// };

// paper is a publisher
// makePublisher(paper);

// var joe = {
// 	drinkCoffee: function(paper){
// 		console.log('just read ' + paper);
// 	},
// 	sundayPreNap: function(monthly){
// 		console.log('About to fall asleep reading this ' + monthly);
// 	}
// };

// paper get to know about joe's activities
// paper.subscribe(joe.drinkCoffee);
// paper.subscribe(joe.sundayPreNap, "monthly");

// paper.daily();
// paper.daily();
// paper.daily();
// paper.monthly();

// makePublisher(joe);

// joe.tweet = function(msg){
// 	this.publish(msg);
// };

// paper.readTweets = function(tweet){
// 	console.log('Call big meeting - ' + tweet);
// };

// joe.subscribe(paper.readTweets);

// joe.tweet("hated the paper today");