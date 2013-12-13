define(["observer/publisher"],function(){

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
	},

	unsubscribe = function(fn, type){
		this.visitSubscribers('unsubscribe', fn, type);
	},

	publish = function(publication, type){
		visitSubscribers('publish', publication, type);
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
	};
	return{
		subscribers: subscribers,
		publish: publish,
		subscribe: subscribe,
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
});


// define(["observer/publisher"],function(){
// 	return{
// 		publisher: {
// 			subscribers: {
// 				//event type: subscribers
// 				any: [] 
// 			},
// 			subscribe: function(fn, type){
// 				type = type || 'any';
// 				if(typeof this.subscribers[type] === "undefined"){
// 					this.subscribers[type] = [];
// 				}
// 				this.subscribers[type].push(fn);
// 			},
// 			unsubscribe: function(fn, type){
// 				this.visitSubscribers('unsubscribe', fn, type);
// 			},
// 			publish: function(publication, type){
// 				this.visitSubscribers('publish', publication, type);
// 			},
// 			visitSubscribers: function(action, arg, type){
// 				var pubtype = type || 'any',
// 				subscribers = this.subscribers[pubtype],
// 				i,
// 				max = subscribers.length;

// 				for(i=0; i<max; i+=1){
// 					if(action === 'publish'){
// 						subscribers[i](arg);
// 					}
// 					else{
// 						if(subscribers[i] === arg){
// 							subscribers.splice(i, 1);
// 						}
// 					}
// 				}
// 			}
// 		},
// 		makePublisher: function(o){
// 			var prop;
// 			for(prop in this.publisher){
// 				if (this.publisher.hasOwnProperty(prop) && typeof this.publisher[prop] === "function"){
// 					o[prop] = this.publisher[prop];
// 				}
// 			}
// 			o.subscribers = {any: []};
// 			return o;
// 		}
// 	};
// });