'use strict';

function ajax (url) {
	this.url = url;
};

ajax.prototype.getImages = function(renderImages, viewImage, win) {
	var start = +new Date(),
	stop,
	responseTime;

	Ajax.makeCall({
		url: this.url,
		contentType: "application/x-www-form-urlencoded",
		type: "POST",
		async: true,
		// data: "mode=tabmenu",
		success: function (xhr, response, status) {
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

				win.removeAjaxLoader();
				win.statusSpan.appendChild(document.createTextNode(statusText));

				// Call second callback function to view image.
				viewImage(imageData);
			}
		},
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
};