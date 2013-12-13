var MEDIATOR = MEDIATOR || {};

MEDIATOR.namespace = function(ns_string)
{
	var parts = ns_string.split('.'),
	parent = MEDIATOR,
	i;
	
	if(parts[0] === "MEDIATOR")
	{
		parts = parts.slice(1);
	}
	
	for(i=0; i<parts.length; i+=1)
	{
		if(typeof parent[parts[i]] === "undefined")
		{
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
}

MEDIATOR.namespace('core.observer');

MEDIATOR.core.observer = (function(){

	var subscribers = {
		//event type: subscribers
		any: [] 
	};
	console.log(subscribers);
	// private properties
	var subscribe = function(fn, type){
		type = type || 'any';
		if(typeof this.subscribers[type] === "undefined"){
			this.subscribers[type] = [];
		}
		this.subscribers[type].push(fn);

		return this;
	},

	unsubscribe = function(fn, type){
		visitSubscribers('unsubscribe', fn, type);

		return this;
	},

	publish = function(publication, type){
		visitSubscribers('publish', publication, type);

		return this;
	},

	visitSubscribers = function(action, arg, type){
		console.log(subscribers);
		var pubtype = type || 'any',
		// subscribers = this.subscribers[pubtype],
		i,
		max = subscribers[pubtype].length;

		for(i=0; i<max; i+=1){
			if(action === 'publish'){
				subscribers[pubtype][i](arg);
			}
			else{
				if(subscribers[pubtype][i] === arg){
					subscribers[pubtype].splice(i, 1);
				}
			}
		}
		return this;
	};
	// facade and public API
	return{
		subscribers: subscribers,
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		publish: publish,
		makePublisher: function(o){
			var prop;
			// console.log(observer);
			console.log(this);
			for(prop in this){
				if (this.hasOwnProperty(prop) && typeof this[prop] === "function"){
					o[prop] = this[prop];
				}
			}
			o.subscribers = {any: []};
		}
	};
}());

// var observer = MEDIATOR.core.observer;
// var publish = observer.publish;
// var subscribe = observer.subscribe;

// console.log(observer.makePublisher);
// console.log(publish);
// console.log(subscribe);

// var paper = {
// 	daily: function(){
// 		observer.publish("big news today");
// 	},
// 	monthly: function(){
// 		observer.publish("interesting analysis", "monthly");
// 	}
// };

// // paper is a publisher
// observer.makePublisher(paper);
// console.log(paper);

// var joe = {
// 	drinkCoffee: function(paper){
// 		console.log('just read ' + paper);
// 	},
// 	sundayPreNap: function(monthly){
// 		console.log('About to fall asleep reading this ' + monthly);
// 	}
// };

// // paper get to know about joe's activities
// observer.subscribe(joe.drinkCoffee);
// observer.subscribe(joe.sundayPreNap, "monthly");

// paper.daily();
// paper.daily();
// paper.daily();
// paper.monthly();

// observer.makePublisher(joe);

// joe.tweet = function(msg){
// 	observer.publish(msg);
// };

// paper.readTweets = function(tweet){
// 	console.log('Call big meeting - ' + tweet);
// };

// observer.subscribe(paper.readTweets);

// joe.tweet("hated the paper today");

// console.log(observer.subscribers);