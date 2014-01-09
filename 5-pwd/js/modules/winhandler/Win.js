'use strict';
// Default initialization of WEBAPP
var WEBAPP = WEBAPP || {};

// Initialization adapted for jshint
// var WEBAPP = {};

// !! jshint STOPS COMPLAINING IF WEBAPP GLOBAL IS DELETED FROM jshint's JSON CONFIG FILE IN
//(node_modules/grunt-contrib-jshint) !!

// namespace functionality taken from the book javascript patterns.
WEBAPP.namespace = function(ns_string)
{
	var parts = ns_string.split('.'),
	parent = WEBAPP,
	i;
	
	if(parts[0] === "WEBAPP")
	{
		parts = parts.slice(1);
	}
	
	for(i=0; i<parts.length; i++)
	{
		if(typeof parent[parts[i]] === "undefined")
		{
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};

// Define namespace for Win module
WEBAPP.namespace('WinHandler');
// WEBAPP.namespace('WinHandler.WinStorage');
// WEBAPP.namespace('WinHandler.Window');
// WEBAPP.namespace('WinHandler.ThumbNailWindow');
// WEBAPP.namespace('WinHandler.ImageWindow');
// WEBAPP.namespace('WinHandler.RSSWindow');

// WinHandler MODULE
/**
 * Contains logic and creates constructors for a Personal Web Application (PWD).
 * @author Sherief Badran <sb222rf@student.lnu.se>
 * @namespace WEBAPP.WinHandler
 * @class WinStorage, Win, ThumbnailWindow
 * @call new WEBAPP.WinHandler.WinStorage()
 * @param {[Object]} [args] ...
 * []
 */

WEBAPP.WinHandler.WinStorage = (function()
{
	// dependencies: none
	
	// ********** PRIVATE MODULE PROPERTIES AND METHODS **********
	// Private methods below are called internally within the module.

	// Called from 
	var deleteWindow = function(windows, windowInstance, winElement) {

		// handler = getFocusHandler();
		winElement.parentNode.removeChild(winElement);

		var i;
		for (i = 0; i < windows.length; i++) {
			if (windowInstance === windows[i]) {
				// winElement.removeEventListener('mousedown', handler, false);
				windows.splice(i, 1);
			};
		};
	};

	var focus = function(windows, win, target) {
		var windowOnFocus;
		var max_zIndex;

		if (windows.length > 1) {
			var max_zIndex = calculateMaxZIndex(win, windows);
			win.style.zIndex = max_zIndex + 10;
		};
		
		windowOnFocus = target.className === 'topbar' ? target.parentNode : target;

		windows.filter(function(w) {
			if (w.win !== windowOnFocus) {
				console.log("false");
				if (w.win.style.zIndex > 1) {
					w.win.style.zIndex = parseInt(w.win.style.zIndex) - 1;
				};
			}
		});
	};

	var calculateMaxZIndex = function(win, windows) {
		console.log('calculate index');
		var zIndexes = [];
		var max_zIndex;

		if (windows.length > 1) {
			zIndexes = windows.map(function(windowInstance, i) {
				return parseInt(windowInstance.win.style.zIndex);
			});
		};

		if (zIndexes.length > 1) {
			var max_zIndex = zIndexes.reduce(function(prev_zIndex, current_zIndex, i, zIndexes) {
				return Math.max(prev_zIndex, current_zIndex);
			});

			win.style.zIndex = max_zIndex + 1;
		};

		return max_zIndex;
	}
	
	// optionally one-time init procedures:
	var doc = document,
	Ajax = AJAX.xhr,
	body = doc.body,
	that;
	
	// ********** PUBLIC API **********

	var WinStorage = function(posX, posY, dYdX) {

		// Private variables.
		that = this;
		var windows = [];
		var oldWin;

		// Public variables for window screen - positioning. Default screen-position is (x, y) = (60, 100)px.
		// If many windows they are opened with a defautl deltaY deltaX screen - position shift of 10 px.   
		this.posX = posX ? posX : 100;
		this.posY = posY ? posY : 60;
		this.dYdX = dYdX ? dYdX : 10;

		this.setWindow = function(windowInstance, constructorFunc) {

			if (windowInstance instanceof constructorFunc) {

				// Store window instance
				windows.push(windowInstance);

				// Retrieve window element from windowInstance
				var win = windowInstance.win;

				// Set Focus on new window.
				if (windows.length > 1) {
					var max_zIndex = calculateMaxZIndex(win, windows);
					win.style.zIndex = max_zIndex;
				};

				// Set new window screen position.
				if (windowInstance.dragDrop === true) {


					win.style.left = this.posX + (this.dYdX * windows.length) + "px";
					win.style.top = this.posY + (this.dYdX * windows.length) + "px";
				};

				// Set focus on clicked window and arrange windows in correct zIndex order.
				var setFocus = function(e) {
					var target = e.srcElement || e.target;

					// Filter out window's delete icon from any clicks.
					if (target.className === 'deleteIcon') {
						return;
					};

					// if (target.tagName.toLowerCase() === 'img') {
					// 	console.log(target);
					// };

					// Test for DOM Level 2 events support.
					if(typeof e.preventDefault === "function"){
						e.preventDefault();
					};

					// IE.
					if(typeof e.returnValue !== "undefined"){
						e.returnValue = false;
					};
					
					// Pass to private module logic.
					if (windows.length > 1) {
						focus(windows, win, target);
					};
				};
				win.addEventListener('mousedown', setFocus, false);
			};
		};

		this.getWindows = function() {
			return windows;
		};

		this.getNumberOfWindows = function() {
			return windows.length;
		}

		this.getWindow = function(windowInstance) {
			var win = windows.filter(function(w) {
				return w === windowInstance;
			});
			return win[0];
		};

		this.deleteWindowOnClick = function(windowInstance) {
			that = this;
			var win = windows.filter(function(w) {

				if (w === windowInstance) {

					windowInstance.win.addEventListener('click', function(e) {
						var target = e.srcElement || e.target;

						if (target.className !== 'deleteIcon') {
							return;
						};

						deleteWindow(windows, w, w.win);
						console.log("window to delete: "+w.win);

					}, false);
				};

			});

		};
	};

	// return the constructor to be assigned to the new namespace
	return WinStorage;
}());

WEBAPP.WinHandler.Window = (function()
{
	// dependencies: none
	
	// ********** PRIVATE MODULE PROPERTIES AND METHODS **********
	// Private methods below are called internally within the module.

	// Called from 
	var deleteWindow = function(windows, windowInstance, winElement) {

		// handler = getFocusHandler();
		winElement.parentNode.removeChild(winElement);

		var i;
		for (i = 0; i < windows.length; i++) {
			if (windowInstance === windows[i]) {
				// winElement.removeEventListener('mousedown', handler, false);
				windows.splice(i, 1);
			};
		};
	};

	var focus = function(windows, win, target) {
		var windowOnFocus;
		var max_zIndex;

		if (windows.length > 1) {
			var max_zIndex = calculateMaxZIndex(win, windows);
			win.style.zIndex = max_zIndex + 10;
		};
		
		windowOnFocus = target.className === 'topbar' ? target.parentNode : target;

		windows.filter(function(w) {
			if (w.win !== windowOnFocus) {
				console.log("false");
				if (w.win.style.zIndex > 1) {
					w.win.style.zIndex = parseInt(w.win.style.zIndex) - 1;
				};
			}
		});
	};

	var calculateMaxZIndex = function(win, windows) {
		console.log('calculate index');
		var zIndexes = [];
		var max_zIndex;

		if (windows.length > 1) {
			zIndexes = windows.map(function(windowInstance, i) {
				return parseInt(windowInstance.win.style.zIndex);
			});
		};

		if (zIndexes.length > 1) {
			var max_zIndex = zIndexes.reduce(function(prev_zIndex, current_zIndex, i, zIndexes) {
				return Math.max(prev_zIndex, current_zIndex);
			});

			win.style.zIndex = max_zIndex + 1;
		};

		return max_zIndex;
	}
	
	// optionally one-time init procedures:
	var doc = document,
	Ajax = AJAX.xhr,
	body = doc.body,
	that;
	
	// ********** PUBLIC API **********
	
	// Define a Super Class
	var Win = function(){
		that = this;
		that.dragDrop = false;
		
		// Create Window
		this.createWindow = function() {
			that.win = doc.createElement('div');
			that.win.setAttribute('class', 'window draggable');
			that.win.style.zIndex = 100;

			// Create top bar
			that.topBar = doc.createElement('div');
			that.topBar.setAttribute('class', 'topbar');

			// Create topBar content
			that.p = doc.createElement('p');
			that.deleteIconSpan = doc.createElement('span');
			that.deleteIconSpan.setAttribute('class', 'deleteIcon');

			// Create status bar
			that.statusBar = doc.createElement('div');
			that.statusSpan = doc.createElement('span');
			that.ajaxLoader = doc.createElement('img');
			that.statusBar.setAttribute('class', 'statusBar');
			that.statusSpan.setAttribute('class', 'hideAjaxLoader');
			that.ajaxLoader.setAttribute('class', 'ajaxLoader');
			that.ajaxLoader.setAttribute('src', 'css/images/ajax-loader.gif');

			// top bar appending
			that.p.appendChild(that.deleteIconSpan);
			that.topBar.appendChild(that.p);

			// status bar appending
			that.statusSpan.appendChild(that.ajaxLoader);
			that.statusSpan.appendChild(doc.createTextNode('Laddar...'));
			that.statusBar.appendChild(that.statusSpan);

			// win appending
			that.win.appendChild(that.topBar);
			that.win.appendChild(that.statusBar);

			// appending to dom
			body.appendChild(that.win);
		};

		this.getImages = function(url, renderImages, viewImageOnClick, win, WindowStorage) {
			var start = +new Date(),
			stop,
			responseTime;
			var AjaxHandler = AJAX.xhr;

			function success(xhr, response, status) {
				var that = this;
				that.xhr = xhr;
				that.response = response;
				that.status = status;

				this.onsuccess = function () {
					if(xhr.responseText.indexOf("ERRNO") >= 0 || xhr.responseText.indexOf("error:") >= 0 || xhr.responseText.length == 0) {
						alert(xhr.responseText.length == 0 ? "Server error." : response);
					}
					else {

						// Call first callback function to render images.
						var imageData = renderImages(response);
						var numberOfImages = imageData.thumbURLs.length.toString();
						var statusSpan = win.statusSpan;

						stop = +new Date();

						// Calculate response time for ajax call expressed in seconds.
						responseTime = ((stop-start)/1000);
						var statusText = numberOfImages + " bilder laddade på " + responseTime.toString() + " s";

						// Remove Ajaxloader
						win.removeAjaxLoader();
						win.statusSpan.appendChild(document.createTextNode(statusText));

						// Call second callback function to view image.
						viewImageOnClick(imageData, WindowStorage);
					}
				};
			};

			var ajax = new AjaxHandler.Xhr({
				url: url,
				contentType: "application/x-www-form-urlencoded",
				type: "GET",
				async: true,
				// data: "mode=tabmenu",
				success: success,
				complete: function (xhr, status) {
					console.log("Ajax Call is completed!");
				},
				showErrors: true,
				error: function(xhr, statusText, typeError) {
					// when set to true, display detailed error messages
					var debugMode = true;

					// display error message, with more technical details if debugMode is true
					// for documentation, remember that all errorinfo is accessible in xhr.responseText
					console.log("Error accessing the server! " + (debugMode ? xhr.status + " " + statusText + "\r\n" + typeError: ""));
				}
			});

			ajax.makeCall();
		};

		this.getRSSFead = function(url, renderRSS, win, WindowStorage) {
			var start = +new Date(),
			stop,
			responseTime;
			var AjaxHandler = AJAX.xhr;

			function success(xhr, response, status) {
				var that = this;
				that.xhr = xhr;
				that.response = response;
				that.status = status;

				this.onsuccess = function () {
					if(xhr.responseText.indexOf("ERRNO") >= 0 || xhr.responseText.indexOf("error:") >= 0 || xhr.responseText.length == 0) {
						alert(xhr.responseText.length == 0 ? "Server error." : response);
					}
					else {

						// Call first callback function to render images.
						// console.log(response);
						renderRSS(xhr.response)
						var statusSpan = win.statusSpan;

						stop = +new Date();

						// Calculate response time for ajax call expressed in seconds.
						responseTime = ((stop-start)/1000);
						var statusText = "Laddat på " + responseTime.toString() + " s";

						win.removeAjaxLoader();
						win.statusSpan.appendChild(document.createTextNode(statusText));

						// Call second callback function to view image.
						
					}
				};
			};

			var ajax = new AjaxHandler.Xhr({
				url: url,
				contentType: "application/x-www-form-urlencoded",
				type: "POST",
				async: true,
				// data: "mode=tabmenu",
				success: success,
				complete: function (xhr, status) {
					console.log("Ajax Call is completed!");
				},
				showErrors: true,
				error: function(xhr, statusText, typeError) {
					// when set to true, display detailed error messages
					var debugMode = true;

					// display error message, with more technical details if debugMode is true
					// for documentation, remember that all errorinfo is accessible in xhr.responseText
					console.log("Error accessing the server! " + (debugMode ? xhr.status + " " + statusText + "\r\n" + typeError: ""));
				}
			});

			ajax.makeCall();
		};
	};

	// prototype object
	Win.prototype = {
		setDragDrop: function(){
			console.log(this.win);
			var win = null,
			diffX = 0,
			diffY = 0;

			this.dragDrop = true;

			var mouseDownHandler = function(e) {
			    var target = e.srcElement || e.target;
			    if (target.getAttribute('class') != 'topbar') {
			    	return;
			    };
			    
			    
			    // activeDragEl.style.zIndex = lastDragEl.style.zIndex + 1;
			    // lastDragEl = activeDragEl;
			    win = target.parentNode;
			    var clientRect = win.getBoundingClientRect();
				win.diffX = parseInt(e.clientX - clientRect.left);
			    win.diffY = parseInt(e.clientY - clientRect.top);

				// Test for DOM Level 2 events support.
				if(typeof e.preventDefault === "function"){
					e.preventDefault();
				};

				// IE.
				if(typeof e.returnValue !== "undefined"){
					e.returnValue = false;
				};

				e.stopPropagation();
			};
			body.addEventListener('mousedown', mouseDownHandler, false);

			var mouseMoveHandler = function(e) {
			    if (!win) {
					return;
				};
				console.log(win);
			    if ((e.clientX - win.diffX) < 0) {
			    	win.style.left = 0 + "px";
			    	return;
			    };

			    if ((e.clientX - win.diffX) > 820) {
			    	win.style.left = 820 + "px";
			    	return;
			    };

			    if ((e.clientX - win.diffX)) {

			    };

			    win.style.left = (e.clientX - win.diffX) + 'px';
			    win.style.top  = (e.clientY - win.diffY) + 'px';

				// Test for DOM Level 2 events support.
				if (typeof e.preventDefault === "function"){
					e.preventDefault();
				};

				// IE.
				if (typeof e.returnValue !== "undefined"){
					e.returnValue = false;
				};

				e.stopPropagation();
			};
			body.addEventListener('mousemove', mouseMoveHandler, false);

			var mouseUpHandler = function(e) {
    			win = null;

				// Test for DOM Level 2 events support.
				if(typeof e.preventDefault === "function"){
					e.preventDefault();
				};

				// IE.
				if(typeof e.returnValue !== "undefined"){
					e.returnValue = false;
				};

				e.stopPropagation();
			};
			body.addEventListener('mouseup',mouseUpHandler , false);
		},

		changeWindowCssClass: function(className) {
			this.win.setAttribute('class', className);
		},

		renderMenu: function() {

			that.menuBar = doc.createElement('div');
			that.menuBar.setAttribute('class', 'menuBar');

			that.ul = doc.createElement('ul');
			that.level2_ul1 = doc.createElement('ul');
			that.level2_ul2 = doc.createElement('ul');

			that.li_1 = doc.createElement('li');
			that.li_2 = doc.createElement('li');

			that.level2_li1 = doc.createElement('li');
			that.level2_li1.setAttribute('class', 'close');

			that.level2_li2 = doc.createElement('li');
			that.level2_li2.setAttribute('class', 'interval');

			that.level2_li3 = doc.createElement('li');
			that.level2_li3.setAttribute('class', 'source');

			that.level2_li4 = doc.createElement('li');
			that.level2_li4.setAttribute('class', 'update');

			that.a1 = doc.createElement('a');
			that.a1.appendChild(doc.createTextNode('Arkiv'));

			that.a2 = doc.createElement('a');
			that.a2.appendChild(doc.createTextNode('Inställningar'));

			that.a3 = doc.createElement('a');
			that.a3.appendChild(doc.createTextNode('Stäng'));

			that.a4 = doc.createElement('a');
			that.a4.appendChild(doc.createTextNode('Uppdateringsintervall'));

			that.a5 = doc.createElement('a');
			that.a5.appendChild(doc.createTextNode('Välj källa'));

			that.a6 = doc.createElement('a');
			that.a6.appendChild(doc.createTextNode('Uppdatera nu'));

			that.li_1.appendChild(that.a1);
			that.li_2.appendChild(that.a2);

			that.level2_li1.appendChild(that.a3);
			that.level2_ul1.appendChild(that.level2_li1);
			that.li_1.appendChild(that.level2_ul1);

			that.level2_li2.appendChild(that.a4);
			that.level2_li3.appendChild(that.a5);
			that.level2_li4.appendChild(that.a6);

			that.level2_ul2.appendChild(that.level2_li2);
			that.level2_ul2.appendChild(that.level2_li3);
			that.level2_ul2.appendChild(that.level2_li4);
			that.li_2.appendChild(that.level2_ul2);

			that.ul.appendChild(that.li_1);
			that.ul.appendChild(that.li_2);

			that.menuBar.appendChild(that.ul);

			this.win.appendChild(that.menuBar);
		}
	};

	// return the constructor to be assigned to the new namespace
	return Win;
}());

WEBAPP.WinHandler.ThumbNailWindow = (function()
{
	// dependencies: none
	
	// ********** PRIVATE MODULE PROPERTIES AND METHODS **********
	// Private methods below are called internally within the module.

	// Called from 
	var deleteWindow = function(windows, windowInstance, winElement) {

		// handler = getFocusHandler();
		winElement.parentNode.removeChild(winElement);

		var i;
		for (i = 0; i < windows.length; i++) {
			if (windowInstance === windows[i]) {
				// winElement.removeEventListener('mousedown', handler, false);
				windows.splice(i, 1);
			};
		};
	};

	var focus = function(windows, win, target) {
		var windowOnFocus;
		var max_zIndex;

		if (windows.length > 1) {
			var max_zIndex = calculateMaxZIndex(win, windows);
			win.style.zIndex = max_zIndex + 10;
		};
		
		windowOnFocus = target.className === 'topbar' ? target.parentNode : target;

		windows.filter(function(w) {
			if (w.win !== windowOnFocus) {
				console.log("false");
				if (w.win.style.zIndex > 1) {
					w.win.style.zIndex = parseInt(w.win.style.zIndex) - 1;
				};
			}
		});
	};

	var calculateMaxZIndex = function(win, windows) {
		console.log('calculate index');
		var zIndexes = [];
		var max_zIndex;

		if (windows.length > 1) {
			zIndexes = windows.map(function(windowInstance, i) {
				return parseInt(windowInstance.win.style.zIndex);
			});
		};

		if (zIndexes.length > 1) {
			var max_zIndex = zIndexes.reduce(function(prev_zIndex, current_zIndex, i, zIndexes) {
				return Math.max(prev_zIndex, current_zIndex);
			});

			win.style.zIndex = max_zIndex + 1;
		};

		return max_zIndex;
	}
	
	// optionally one-time init procedures:
	var doc = document,
	Ajax = AJAX.xhr,
	body = doc.body,
	that;
	
	// ********** PUBLIC API **********

	// Define a Win sub class
	var Window = WEBAPP.WinHandler.Window;
	ThumbNailWindow.prototype = new Window();
	ThumbNailWindow.prototype.constructor = ThumbNailWindow;
	// var WindowStorage = new WinStorage(60, 100, 20);
	function ThumbNailWindow() {

		// Call super class constructor
		Window.call(this);
	};

	ThumbNailWindow.prototype.renderTopBarHeader = function(windowIconSrc, windowHeaderText) {
		var windowIconSrc = windowIconSrc || 'css/images/18.png';
		var windowHeaderText = windowHeaderText || 'Image Viewer';

		var Window = this.win;
		var topBar = Window.childNodes[0];
		var topBar_pTag = topBar.firstChild;

		var headingSpan = doc.createElement('span');
		var heading = doc.createTextNode(windowHeaderText); // parameter value
		var windowIconSpan = doc.createElement('span');
		var windowIcon = doc.createElement('img');
		headingSpan.setAttribute('class', 'heading');
		windowIcon.setAttribute('src', windowIconSrc); // parameter value
		windowIcon.setAttribute('width', '20');
		windowIconSpan.appendChild(windowIcon);
		windowIconSpan.setAttribute('class', 'windowIcon');

		headingSpan.appendChild(heading);

		topBar_pTag.appendChild(windowIconSpan);
		topBar_pTag.appendChild(headingSpan);
	};

	ThumbNailWindow.prototype.removeAjaxLoader = function() {
		this.statusSpan.firstChild.remove();
	};

	// return the constructor to be assigned to the new namespace
	return ThumbNailWindow;
}());


WEBAPP.WinHandler.ImageWindow = (function()
{
	// dependencies: none
	
	// ********** PRIVATE MODULE PROPERTIES AND METHODS **********
	// Private methods below are called internally within the module.

	// Called from 
	var deleteWindow = function(windows, windowInstance, winElement) {

		// handler = getFocusHandler();
		winElement.parentNode.removeChild(winElement);

		var i;
		for (i = 0; i < windows.length; i++) {
			if (windowInstance === windows[i]) {
				// winElement.removeEventListener('mousedown', handler, false);
				windows.splice(i, 1);
			};
		};
	};

	var focus = function(windows, win, target) {
		var windowOnFocus;
		var max_zIndex;

		if (windows.length > 1) {
			var max_zIndex = calculateMaxZIndex(win, windows);
			win.style.zIndex = max_zIndex + 10;
		};
		
		windowOnFocus = target.className === 'topbar' ? target.parentNode : target;

		windows.filter(function(w) {
			if (w.win !== windowOnFocus) {
				console.log("false");
				if (w.win.style.zIndex > 1) {
					w.win.style.zIndex = parseInt(w.win.style.zIndex) - 1;
				};
			}
		});
	};

	var calculateMaxZIndex = function(win, windows) {
		console.log('calculate index');
		var zIndexes = [];
		var max_zIndex;

		if (windows.length > 1) {
			zIndexes = windows.map(function(windowInstance, i) {
				return parseInt(windowInstance.win.style.zIndex);
			});
		};

		if (zIndexes.length > 1) {
			var max_zIndex = zIndexes.reduce(function(prev_zIndex, current_zIndex, i, zIndexes) {
				return Math.max(prev_zIndex, current_zIndex);
			});

			win.style.zIndex = max_zIndex + 1;
		};

		return max_zIndex;
	}
	
	// optionally one-time init procedures:
	var doc = document,
	Ajax = AJAX.xhr,
	body = doc.body,
	that;
	
	// ********** PUBLIC API **********

	// Define a Win sub class to ThumbNailWindow
	var ThumbNailWindow = WEBAPP.WinHandler.ThumbNailWindow;
	ImageWindow.prototype = new ThumbNailWindow();
	ImageWindow.prototype.constructor = ImageWindow;

	function ImageWindow() {

		// Call super class constructor
		ThumbNailWindow.call(this);
	};

	// return the constructor to be assigned to the new namespace
	return ImageWindow;
}());

WEBAPP.WinHandler.RSSWindow = (function()
{
	// dependencies: none
	
	// ********** PRIVATE MODULE PROPERTIES AND METHODS **********
	// Private methods below are called internally within the module.

	// Called from 
	var deleteWindow = function(windows, windowInstance, winElement) {

		// handler = getFocusHandler();
		winElement.parentNode.removeChild(winElement);

		var i;
		for (i = 0; i < windows.length; i++) {
			if (windowInstance === windows[i]) {
				// winElement.removeEventListener('mousedown', handler, false);
				windows.splice(i, 1);
			};
		};
	};

	var focus = function(windows, win, target) {
		var windowOnFocus;
		var max_zIndex;

		if (windows.length > 1) {
			var max_zIndex = calculateMaxZIndex(win, windows);
			win.style.zIndex = max_zIndex + 10;
		};
		
		windowOnFocus = target.className === 'topbar' ? target.parentNode : target;

		windows.filter(function(w) {
			if (w.win !== windowOnFocus) {
				console.log("false");
				if (w.win.style.zIndex > 1) {
					w.win.style.zIndex = parseInt(w.win.style.zIndex) - 1;
				};
			}
		});
	};

	var calculateMaxZIndex = function(win, windows) {
		console.log('calculate index');
		var zIndexes = [];
		var max_zIndex;

		if (windows.length > 1) {
			zIndexes = windows.map(function(windowInstance, i) {
				return parseInt(windowInstance.win.style.zIndex);
			});
		};

		if (zIndexes.length > 1) {
			var max_zIndex = zIndexes.reduce(function(prev_zIndex, current_zIndex, i, zIndexes) {
				return Math.max(prev_zIndex, current_zIndex);
			});

			win.style.zIndex = max_zIndex + 1;
		};

		return max_zIndex;
	}
	
	// optionally one-time init procedures:
	var doc = document,
	Ajax = AJAX.xhr,
	body = doc.body,
	that;
	
	// ********** PUBLIC API **********

	// Define a sub class to Win
	var ThumbNailWindow = WEBAPP.WinHandler.ThumbNailWindow;
	RSSWindow.prototype = new ThumbNailWindow();
	RSSWindow.prototype.constructor = RSSWindow;

	function RSSWindow() {
		ThumbNailWindow.call(this);
	};

	// return the constructor to be assigned to the new namespace
	return RSSWindow;
}());