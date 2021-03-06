'use strict';

// global dependencies
// var Window = WEBAPP.WinHandler.WinStorage;
// console.log(Window);
// var winHandler = WEBAPP.WinHandler;
// var winStorage = new winHandler.WinStorage(60, 100, 20);

// var PwdControler = {
// 	init: function() {
// 		var that = this;

// 		var namespaces = that.getNameSpaces();
// 		console.log(namespaces);
// 		that.test();
// 	},

// 	getNameSpaces: function() {
// 		console.log(WEBAPP.WinHandler.WinStorage);
// 		var WindowStorage = WEBAPP.WinHandler.WinStorage,
// 		Window = WEBAPP.WinHandler.Window,
// 		ThumbNailWindow = WEBAPP.WinHandler.ThumbNailWindow,
// 		ImageWindow = WEBAPP.WinHandler.ImageWindow,
// 		RSSWindow = WEBAPP.WinHandler.RSSWindow;

// 		return {
// 			WindowStorage: WindowStorage,
// 			Window: Window,
// 			ThumbNailWindow: ThumbNailWindow,
// 			ImageWindow: ImageWindow,
// 			RSSWindow: RSSWindow
// 		};
// 	},

// 	test: function(argument) {
// 		var ns_test = this.getNameSpaces();
// 		console.log(ns_test);
// 	}
// }

var PwdControler = {

	init: function() {

		var doc = document;
		var that = this;
		var WindowStorage = WEBAPP.WinHandler.WinStorage;
		var WinStorage = new WindowStorage(60, 100, 20);
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
				that.openNewImageViewer(WinStorage);
			};

			// If rss-icon is clicked
			if (target.alt === "RssClickIcon") {

				// Pass work to controler logic
				that.openNewRssReader(WinStorage);
			};

		});
	},

	openNewImageViewer: function(WindowStorage) {
		var that = this;

		// Create a new unique thumbNailWindow.
		var ThumbNailWindow = WEBAPP.WinHandler.ThumbNailWindow;
		var TN_Window = new ThumbNailWindow();

		that.setWindowProperties(TN_Window);
		that.saveWindow(TN_Window, WindowStorage);
		that.deleteWindowOnClick(TN_Window, WindowStorage);
		TN_Window.renderTopBarHeader();
		that.loadImagesFromServer(TN_Window, WindowStorage);
	},

	openNewRssReader: function(WindowStorage) {
		var that = this;

		var RSSWindow = WEBAPP.WinHandler.RSSWindow
		var RssWindow = new RSSWindow();

		that.setWindowProperties(RssWindow);
		that.saveWindow(RssWindow, WindowStorage);
		that.deleteWindowOnClick(RssWindow, WindowStorage);
		RssWindow.renderTopBarHeader('css/images/circle_rss.png', 'Rss Reader');
		RssWindow.changeWindowCssClass('RSSWindow');
		RssWindow.renderMenu();
		that.readRSSFromServer(RssWindow, WindowStorage);


	},

	setWindowProperties: function(win) {
		win.createWindow();
		win.setDragDrop();
	},

	saveWindow: function(win, WindowStorage) {
		WindowStorage.setWindow(win, WEBAPP.WinHandler.Window);
	},

	deleteWindowOnClick: function(win, WindowStorage) {
		WindowStorage.deleteWindowOnClick(win);	
	},

	loadImagesFromServer: function(win, WindowStorage) {
		var that = this;
		var Window = win.win;
		// var WinStorage = WindowStorage;
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

		var viewImageOnClick = function(imageData, WindowStorage) {
			console.log(imageData);
			var viewImage = function(e) {

				var target = e.srcElement || e.target;
				console.log(target.hasAttribute('id'));
			    if (target.tagName.toLowerCase() !== 'img' || !target.hasAttribute('id')) {
			    	return;
			    };

			    var ImageWindow = WEBAPP.WinHandler.ImageWindow
			    var imageWindow = new ImageWindow();

			    // set image window properties and 
			    that.setWindowProperties(imageWindow);
			    that.saveWindow(imageWindow, WindowStorage);
			    that.deleteWindowOnClick(imageWindow, WindowStorage);
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
		win.getImages("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", renderImages, viewImageOnClick, win, WindowStorage);
	},

	readRSSFromServer: function(win, WindowStorage) {
		var Window = win.win;

		var renderRSS = function(response) {
			var string = "string";
			var div = document.createElement('div');
			div.setAttribute('class', 'rssWrapper');
			div.innerHTML = response;
			// div.innerHTML = response;
			console.log(typeof string);
			console.log(response);
			console.log(div);
			Window.appendChild(div);
			// Window.innerHTML = div;
			// var response = "hej";
			// var test = document.createTextNode(response);
			// console.log(typeof test);
			// // Window.appendChild(document.createTextNode(response));
			// console.log(Window);
		};

		setTimeout(function() {
			win.statusSpan.setAttribute('class', 'showAjaxLoader');
		}, 300);
		console.log(win.getBoundingClientRect);
		win.getRSSFead("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.dn.se/m/rss/senaste-nytt"), renderRSS, win, WindowStorage);
	}
};

PwdControler.init();