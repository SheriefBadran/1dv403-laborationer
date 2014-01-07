'use strict';

// global dependencies
var winHandler = WEBAPP.WinHandler;
var winStorage = new winHandler.WinStorage(60, 100, 20);

var PwdControler = {

	init: function() {

		var doc = document;
		var that = this;
		var button = doc.querySelector("button");
		var dockBoard = doc.querySelector("#dock");
		

		dockBoard.addEventListener('click', function(e) {

			// Test for DOM Level 2 events support.
			if (typeof e.preventDefault === "function") {
				e.preventDefault();
			};

			// IE.
			if (typeof e.returnValue !== "undefined") {
				e.returnValue = false;
			};

			var target = e.srcElement || e.target;

			// If thumbnail-icon is clicked
			if (target.alt === "TumbnailClickIcon") {

				// Pass work to controler logic
				that.openNewImageViewer();
			};

			// If rss-icon is clicked
			if (target.alt === "RssClickIcon") {

				// Pass work to controler logic
				that.openNewRssReader();
			};

		});
	},

	openNewImageViewer: function() {
		var that = this;

		// Create a new unique thumbNailWindow.
		var TN_Window = new winHandler.ThumbNailWindow();

		that.setWindowProperties(TN_Window);
		that.saveWindow(TN_Window);
		that.deleteWindowOnClick(TN_Window);
		TN_Window.renderTopBarHeader();
		that.loadImagesFromServer(TN_Window);
	},

	openNewRssReader: function() {
		var that = this;

		var RssWindow = new winHandler.RSSWindow();
		that.setWindowProperties(RssWindow);
		that.saveWindow(RssWindow);
		that.deleteWindowOnClick(RssWindow);
		RssWindow.renderTopBarHeader('css/images/circle_rss.png', 'Rss Reader');
		RssWindow.changeWindowCssClass('RSSWindow');
		RssWindow.renderMenu();
		that.readRSSFromServer(RssWindow);


	},

	setWindowProperties: function(win) {
		win.createWindow();
		win.setDragDrop();
	},

	saveWindow: function(win) {
		winStorage.setWindow(win);
	},

	deleteWindowOnClick: function(win) {
		winStorage.deleteWindowOnClick(win);	
	},

	loadImagesFromServer: function(win) {
		var that = this;
		var Window = win.win;
		console.log(Window);
		var imageData = {};
		// var AjaxCall = new ajax("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/");

		var renderImages = function(response) {

			var thumbWidths = [], thumbHeights = [];
			
			var data = JSON.parse(response);

			thumbWidths = data.map(function(obj, i) {
				return obj.thumbWidth;
			});

			thumbHeights = data.map(function(obj, i) {
				return obj.thumbHeight;
			});

			imageData.thumbWidths = thumbWidths;
			imageData.thumbHeights = thumbHeights;

			imageData.maxThumbWidth = thumbWidths.reduce(function(prevWidth, width) {
				return Math.max(prevWidth, width);
			});

			imageData.maxThumbHeight = thumbHeights.reduce(function(prevHeight, height) {
				return Math.max(prevHeight, height);
			});

			imageData.thumbURLs = data.map(function(obj, i) {
				return obj.thumbURL;
			});

			imageData.widths = data.map(function(obj, i) {
				return obj.width;
			});

			imageData.heights = data.map(function(obj, i) {
				return obj.height;
			});

			imageData.urls = data.map(function(obj, i) {
				return obj.URL;
			});

			imageData.numberOfImages = data.length;

			var frag = document.createDocumentFragment(),
			i;
			for (i = 0; i < imageData.numberOfImages; i++) {
				var a = document.createElement('a');
				// a.style.width = imageData.maxThumbHeight;

				var img = document.createElement('img');
				img.setAttribute('src', imageData.thumbURLs[i]);
				img.setAttribute('height', imageData.thumbHeights[i]);
				img.setAttribute('width', imageData.thumbWidths[i]);
				img.setAttribute('id', imageData.urls[i] + '-' + imageData.heights[i].toString() + '-' + imageData.widths[i].toString());

				a.appendChild(img);
				frag.appendChild(a);
			};

			var wrapper = document.createElement('div');
			wrapper.setAttribute('id', 'thumbWrapper');

			wrapper.appendChild(frag);
			Window.appendChild(wrapper);

			return imageData;
		};

		var viewImageOnClick = function(imageData) {
			console.log(imageData);
			var viewImage = function(e) {

				var target = e.srcElement || e.target;
				console.log(target.hasAttribute('id'));
			    if (target.tagName.toLowerCase() !== 'img' || !target.hasAttribute('id')) {
			    	return;
			    };

			    var imageWindow = new winHandler.ImageWindow();

			    // set image window properties and 
			    that.setWindowProperties(imageWindow);
			    that.saveWindow(imageWindow);
			    that.deleteWindowOnClick(imageWindow);
			    imageWindow.renderTopBarHeader();

			    var imageWindowData = target.id.split('-');

			    var imageUrl = imageWindowData[0];
			    var windowHeight = parseInt(imageWindowData[1]);
			    var windowWidth = parseInt(imageWindowData[2]);

			    // Set window height + 80px extra height to compensate for window topBar and statusBar
			    // each 40px.
			    imageWindow.win.style.height = windowHeight + 80 + 'px';
			    imageWindow.win.style.width = windowWidth + 'px';
			    imageWindow.removeAjaxLoader();

			    var image = document.createElement('img');
			    image.setAttribute('src', imageUrl);
			    image.setAttribute('class', 'fullSizeImage');
			    imageWindow.win.appendChild(image);

			    e.preventDefault();

			};
			Window.addEventListener('click', viewImage, false);
		};

		// Turn on ajaxLoader after 300 ms.
		setTimeout(function() {
			win.statusSpan.setAttribute('class', 'showAjaxLoader');
		}, 300);

		// Make ajax call and pass callback functions that will be executed on success.
		// AjaxCall.getImages(renderImages, viewImageOnClick, win); 
		win.getImages("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", renderImages, viewImageOnClick, win);
	},

	readRSSFromServer: function(win) {
		
	}
};

PwdControler.init();